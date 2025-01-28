import React, { useState, useRef } from "react";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout";
import axios from "axios";

import { useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Group from "../../../../../assets/images/Group.png";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Upload } from "lucide-react";
import ImageChange from "../../../../../assets/images/Image-change.png";

const AddCategoryForm = () => {
  const fileInputRef = useRef(null);
  const location = useLocation();
  const categories = location?.state?.categories || [];
  const singleCategory = location?.state?.category || {};
  const edit = location?.state.edit || false;
  console.log("peadasdfasdf", location);
  const [formState, setFormState] = useState({
    title: singleCategory?.category_title || "",
    image: singleCategory?.image || null,
    allcuisine: [],
    selectedCuisines: [],
    dropdownOpen: false,
    imagePreview: singleCategory?.image || null,
  });
  console.log("asdfklasdfladsflasd;", formState);

  console.log("asdfasdf", singleCategory);
  const [newCuisine, setNewCuisine] = useState("");
  const [selectedCuisineIds, setSelectedCuisineIds] = useState([]);
  const [allCategory, setAllCategory] = useState([]);

  const [cuisines, setCuisines] = useState(
    singleCategory?.cuisines?.map((sub) => ({
      id: sub.cuisine_id,
      title: sub.cuisine_title,
    })) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [type, SetType] = useState("");
  const [newitem, setNewItem] = useState("");
  const [newimage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [newLogo, setNewLogo] = useState(null);
  const [newLogoPreview, setNewLogoPreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Input value
  const [subCategories, setSubCategories] = useState([]); // API results
  const [selectedCategory, setSelectedCategory] = useState(
    singleCategory?.subcategories ? singleCategory?.subcategories : []
  ); // Selected item
  const [loading, setLoading] = useState(false); // Loading state for API
  const [hasUpdated, setHasUpdated] = useState(false);
  let debounceTimeout;

  const navigate = useNavigate();
  const toggleDropdown = () =>
    setFormState((prev) => {
      console.log("priced priced", prev);

      return { ...prev, dropdownOpen: !prev.dropdownOpen };
    });
  const handleRemoveCuisine = (cuisine) => {
    console.log("Cuisine to remove:", cuisine);
    console.log("isiodsijiojoij");
    setFormState((prevState) => {
      console.log("Previous State:", prevState);
      return {
        ...prevState,
        allcuisine: prevState.allcuisine.map((item) => {
          if (item.cuisine_title === cuisine.cuisine_title) {
            // If the item matches the cuisine, set value to false
            return { ...item, value: false };
          }
          // Otherwise, return the item unchanged
          return { ...item };
        }),
      };
    });
  };

  const handleSubmitModal = (type, e) => {
    if ((newitem && newimage) || newLogo) {
      e.preventDefault();
      const formData = new FormData();
      if (type == "Cuisine") {
        formData.append("cuisine_title", newitem);
      } else if (type == "SubCategory") {
        formData.append("subcategory_title", newitem);
      }

      if (newimage) {
        formData.append("image", newimage);
      }
      if (newLogo) {
        formData.append("logo", newLogo);
      }
      let url_link =
        type == "Cuisine"
          ? `${API_URL}/menu/cuisine`
          : type == "SubCategory"
          ? `${API_URL}/menu/subcategory`
          : "";
      if (!url_link) {
        return;
      }
      axios
        .post(url_link, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          const data = response.data.data;
          console.log("jsdjflasl", response.data.data);
          if (type == "Cuisine") {
            setCuisines((prevCuisines) => [
              ...prevCuisines,
              {
                cuisine_id: data.cuisine_id,
                title: data.cuisine_title,
                value: true,
              },
            ]);
            getInfo();
            setShowModal(false);
          }
          console.log(response);
          getInfo();
          setShowModal(false);
          setNewItem("");
          setNewImage(null);
          setNewImagePreview(null);
          setNewLogo(null);
          setNewLogoPreview(null);
          SetType("");
          singleCategory = {};
          console.log("true event");
        })
        .catch(function (error) {
          console.log("error one");
          console.log(error);
        });
    }
  };
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };
  const handleCancel = () => {
    setNewItem("");
    setNewImage(null);
    setNewImagePreview(null);
    setNewLogo(null);
    setNewLogoPreview(null);
    SetType("");
    setShowModal(false);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData("index");
    const updatedData = [...selectedCategory];
    [updatedData[sourceIndex], updatedData[targetIndex]] = [
      updatedData[targetIndex],
      updatedData[sourceIndex],
    ];
    setSelectedCategory(updatedData);
  };

  const handleSubmit = (e) => {
    console.log("sadfsdsds", selectedCuisineIds);
    e.preventDefault();
    const formData = new FormData();
    console.log("asfdasdf", selectedCategory);
    const sub_category_ids = selectedCategory.map(
      (items) => items.subcategory_id
    );
    console.log("asdfasdfasd", formState);
    const cuisine_ids = formState?.allcuisine
      ?.filter((item) => item.value === true)
      .map((items) => items.cuisine_id);
    console.log("reated newly rated items", sub_category_ids, cuisine_ids);
    formData.append("category_title", formState.title);
    cuisine_ids.forEach((id) => formData.append("cuisine_ids", id));
    sub_category_ids.forEach((id) => formData.append("subcategory_ids", id));

    if (formState.image) {
      formData.append("image", formState.image);
    }

    let type = "post";
    let api = `${API_URL}/menu/category`;
    if (singleCategory && edit) {
      type = "put";
      api = `${API_URL}/menu/category/${singleCategory?.category_id}`;
    }
    axios[type](api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then(function (response) {
        console.log(response);
        setFormState({
          title: "",
          subCategory: "",
          selectedCuisines: [],
          dropdownOpen: false,
          imagePreview: null,
        });
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; // Reset the file input
        }
        setSelectedCuisineIds([]);
        setSelectedCategory([]);
        getInfo();
        edit
          ? navigate("/menu/manage-screen/show-category", {
              state: { categories },
            })
          : "";
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Handle image selection
  const handleCacel = () => {
    setFormState({
      title: "",
      subCategory: "",
      selectedCuisines: [],
      dropdownOpen: false,
      imagePreview: null,
    });
    setSelectedCuisineIds([]);
    setSelectedCategory([]);
    getInfo();
    navigate("/menu/manage-screen/show-category", {
      state: { categories },
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log("lllllll", file);
    if (file) {
      setFormState((prev) => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
    console.log("jaskjshlkllasd", formState);
  };
  const handleRemoveItem = (index) => {
    const updatedData = [...selectedCategory];
    updatedData.splice(index, 1);
    setSelectedCategory(updatedData);
  };
  const handleCheckboxChange = (e, value) => {
    console.log("uuuuu223423423", e, value);
    const isChecked = e.target.checked;
    console.log("asdfasdfasdfas", isChecked);
    const updatedCuisine = formState.allcuisine.map((items) => {
      if (items.cuisine_id === value.cuisine_id) {
        return { ...items, value: isChecked };
      } else {
        return { ...items };
      }
    });
    console.log("asdkflkasdjfds", updatedCuisine);

    setFormState((items) => ({ ...items, allcuisine: updatedCuisine }));
  };
  // Remove the selected image
  const handleRemoveImage = () => {
    setFormState((prev) => ({ ...prev, image: null, imagePreview: "" }));
    console.log("kasjdjalslslss");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };
  console.log("dddddd4444", selectedCuisineIds);
  const getInfo = () => {
    try {
      axios
        .get(`${API_URL}/menu/subcategory`)
        .then(function (response) {
          console.log("deeeddd gweeet", response.data);
          setAllCategory(response.data);
          console.log("allsubcatetfgt", allCategory);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("error accured");
    }
    try {
      axios
        .get(`${API_URL}/menu/cuisine`)
        .then(function (response) {
          console.log("deeeddd gweeet cuisine", response.data);
          setFormState((items) => ({ ...items, allcuisine: response.data }));
          console.log("asdfakjsdfkjasdfhkjasd", formState);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log("error accured");
    }

    let updatedcusisine = [];

    console.log("sdfasdfasdfasdf", updatedcusisine);
  };
  const updateCuisines = () => {
    const updatedCuisines = formState.allcuisine.map((cuisine) => {
      // Check if cuisine exists in singleCategory.cuisines
      const isPresent = singleCategory?.cuisines?.some(
        (singleCuisine) => singleCuisine.cuisine_id === cuisine.cuisine_id
      );

      return {
        ...cuisine,
        value: isPresent || false,
      };
    });

    setFormState((prevState) => ({
      ...prevState,
      allcuisine: updatedCuisines,
    }));
  };

  useEffect(() => {
    if (
      formState?.allcuisine?.length > 0 &&
      singleCategory?.cuisines &&
      !hasUpdated
    ) {
      updateCuisines();
      setHasUpdated(true); // Prevent further updates
    }
  }, [singleCategory, formState?.allcuisine]); // Ensure this logic runs when dependencies change
  console.log("asdfasdf222", formState);
  useEffect(() => {
    getInfo();
  }, []);

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log("sadfadfasd", value);
    // Clear the previous timeout
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout to trigger the API call after 500ms
    debounceTimeout = setTimeout(() => {
      fetchSubCategories(value);
    }, 500);
  };
  const fetchSubCategories = async (query) => {
    console.log("new creat3de tine", query);
    if (!query) {
      setSubCategories([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/menu/subcategory/by-name?subcategory_title=${query}`
      );
      const data = await response.json();
      console.log("sadfasd", data);
      setSubCategories(data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (item) => {
    setSelectedCategory((previtem) => [...previtem, item]);
    setSearchTerm("");
    setSubCategories([]);
  };

  console.log("API_URL3322", formState);
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() => {
        navigate("/menu/manage-screen/show-category", {
          state: { categories },
        });
      }}
    >
      <div className="m-6">
        <h2 className="text-lg font-semibold">
          {" "}
          {edit ? "Edit " : "Add "}Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border rounded-lg m-2">
            <div className="flex ">
              <div className="mb-6">
                <label className="block text-sm mb-2">Add category title</label>
                <input
                  id="title"
                  type="text"
                  placeholder="Type here.."
                  className="border border-gray-300 rounded-lg px-3 py-2 w-54"
                  value={formState.title}
                  onChange={(e) =>
                    setFormState((prevState) => ({
                      ...prevState,
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-6 ml-8 relative ">
                <label className="block text-sm mb-2">Add sub category</label>
                <input
                  type="text"
                  placeholder="Enter to add"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-56"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {/* Dropdown */}
                {loading && <p className="text-gray-400 mt-2">Loading...</p>}
                {subCategories.length > 0 && (
                  <ul className="absolute z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto">
                    {subCategories.map((item) => (
                      <li
                        key={item.subcategory_id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(item)}
                      >
                        {item.subcategory_title}
                      </li>
                    ))}

                    <li
                      className="p-2 text-blue-500 cursor-pointer"
                      onClick={() => {
                        SetType("SubCategory"), setShowModal(true);
                      }}
                    >
                      Add new Sub category
                    </li>
                  </ul>
                )}
              </div>
              <div className="mb-6 ml-12 relative">
                <label className="block text-sm mb-2 w-40 ">
                  Select Cuisine
                </label>

                <div className="flex border rounded-lg px-2 py-1 justify-between  bg-white cursor-pointer">
                  <div>
                    {formState?.selectedCuisines?.length > 0
                      ? formState?.selectedCuisines[0]
                      : "Select Cuisine"}
                  </div>
                  <span>
                    <ChevronDownIcon
                      onClick={toggleDropdown}
                      className={`h-4 w-4 transform transition-transform m-2 duration-200 ${
                        formState.dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
                {formState.dropdownOpen && (
                  <div className="absolute  top-full z-2 border bg-white shadow-lg mt-1 w-40 rounded">
                    <div className="p-2">
                      {formState?.allcuisine?.map((cuisine) => (
                        <div
                          key={cuisine?.cuisine_id}
                          className="flex items-center space-x-2 mb-1"
                        >
                          {console.log("asfasd", cuisine)}
                          <input
                            type="checkbox"
                            checked={cuisine.value}
                            onChange={(e) => handleCheckboxChange(e, cuisine)}
                          />
                          <label>{cuisine?.cuisine_title}</label>
                        </div>
                      ))}
                      <hr className="my-2" />

                      <label
                        className="p-2 text-blue-500 cursor-pointer"
                        onClick={() => {
                          SetType("Cuisine"), setShowModal(true);
                        }}
                      >
                        Add new cuisine
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div
              className={`relative border border-dashed border-gray-300 rounded-lg ${
                !formState.image ? "p-8" : ""
              } w-40 flex flex-col  cursor-pointer hover:bg-gray-50`}
            >
              {formState.image && (
                <button
                  onClick={handleRemoveImage}
                  className="text-white px-4 py-1 absolute top-1 right-[-1px] "
                >
                  <img src={ImageChange} alt="X" className="w-4 h-4 " />
                </button>
              )}
              {/* Upload icon */}
              <input
                type="file"
                id="Choose image"
                name="Choose image"
                onChange={handleFileChange}
                accept="image/png"
                ref={fileInputRef}
                style={{ display: "none" }} // Hides the file input
              />
              {!formState.image ? (
                <Upload
                  className="w-8 h-8 text-gray-400 mb-2"
                  onClick={() => {
                    document.getElementById("Choose image").click();
                  }}
                />
              ) : (
                ""
              )}

              {/* File input */}

              {/* Preview the image if it's uploaded */}
              {formState.imagePreview || formState.image ? (
                <>
                  <div className="flex flex-col items-center">
                    <img
                      src={formState.imagePreview}
                      alt="Preview"
                      className=" object-fit rounded-lg mb-2"
                    />
                  </div>
                </>
              ) : (
                <span className="text-sm text-gray-500">No image selected</span>
              )}
            </div>
            <div className="mt-10">
              <label className="block text-sm mb-4">Add Cuisine</label>
              <div className="flex flex-wrap gap-4  m-4">
                {formState?.allcuisine
                  ?.filter((cuisine) => cuisine.value == true)
                  .map((cuisine) => (
                    <span
                      key={cuisine.cuisine_id}
                      className="px-2 py-1 bg-gray-200 rounded-full flex items-center"
                    >
                      {cuisine.cuisine_title}
                      <button
                        className="ml-2 text-red-500"
                        onClick={(e) => {
                          e.preventDefault();
                          console.log("jashdkjhasdkhskls");
                          handleRemoveCuisine(cuisine);
                        }}
                      >
                        &times;
                      </button>
                    </span>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-sm mt-6 mb-4">
                Add Sub category
              </label>

              <div className="grid grid-cols-4 gap-4">
                {console.log("lonmg timedi", selectedCategory)}
                {selectedCategory?.map((item, index) => (
                  <div
                    key={item?.subcategory_id}
                    draggable
                    onDragStart={(event) => handleDragStart(event, index)}
                    onDragOver={handleDragOver}
                    onDrop={(event) => handleDrop(event, index)}
                  >
                    <div
                      className="mb-1"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <span className="ml-2">
                        <img src={Group} />
                      </span>
                      <span className="ml-2">{item?.subcategory_title}</span>
                      <span
                        className="ml-2"
                        onClick={() => handleRemoveItem(index)}
                      >
                        x
                      </span>
                    </div>
                    <img
                      src={item?.image}
                      alt={item?.subcategory_title}
                      className="border border-2 z-1 rounded-md  w-44 h-40"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-row items-end space-x-4 m-8">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                onClick={handleSubmit}
              >
                {edit ? "Update " : "Add "} Category
              </button>
              <button
                type="reset"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg"
                onClick={handleCacel}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add New {type}</h2>
              <button
                onClick={() => {
                  handleCancel();
                }}
              >
                &times;
              </button>
            </div>

            {/* Cuisine Title Input */}
            <div className="mb-4">
              <label className="block mb-1">Enter {type} title</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder={`${type} title`}
                value={newitem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </div>

            {/* Image Upload */}

            <div className="grid grid-cols-2 gap-4 ">
              {/* add image for logo */}
              {type !== "Cuisine" && (
                <div>
                  <label>Add Logo:</label>
                  <div
                    className={`mb-4 mt-2 w-fit border border-gray-300 rounded-lg ${
                      !newLogo ? "p-8" : ""
                    }  flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50`}
                    onClick={() => {
                      document.getElementById("new item logo").click();
                    }}
                  >
                    <input
                      id="new item logo"
                      type="file"
                      name="new item logo"
                      accept="image/png, image/jpeg"
                      onChange={(e) => {
                        console.log("listed listed name", e.target),
                          setNewLogo(e.target.files[0]),
                          setNewLogoPreview(
                            URL.createObjectURL(e.target.files[0])
                          );
                      }}
                      style={{ display: "none" }}
                    />

                    {console.log("newluasifoalsdfjasld", newImagePreview)}
                    {!newLogo ? (
                      <Upload className="w-8 h-8 text-gray-400" />
                    ) : (
                      ""
                    )}

                    {newLogoPreview || newLogo ? (
                      <img
                        src={newLogoPreview}
                        alt="Preview"
                        className=" object-fit rounded-lg h-28"
                      />
                    ) : (
                      <div>
                        <span className="text-gray-500 text-sm">
                          Choose Logo
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* code for the add image   */}
              <div>
                <lable>Add Image:</lable>
                <div
                  className={`mb-4 mt-2  border border-gray-300 rounded-lg ${
                    !newimage ? "p-8" : ""
                  } w-full flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50`}
                  onClick={() => {
                    document.getElementById("new item image").click();
                  }}
                >
                  <input
                    id="new item image"
                    type="file"
                    name="new item image"
                    accept="image/png, image/jpeg"
                    onChange={(e) => {
                      console.log("listed listed name", e.target),
                        setNewImage(e.target.files[0]),
                        setNewImagePreview(
                          URL.createObjectURL(e.target.files[0])
                        );
                    }}
                    style={{ display: "none" }}
                  />

                  {console.log("newluasifoalsdfjasld", newImagePreview)}
                  {!newimage ? (
                    <Upload className="w-8 h-8 text-gray-400" />
                  ) : (
                    ""
                  )}

                  {newImagePreview || newimage ? (
                    <img
                      src={newImagePreview}
                      alt="Preview"
                      className=" h-28 object-full rounded-lg "
                    />
                  ) : (
                    <div>
                      <span className="text-gray-500 text-sm">
                        Choose Image
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => {
                  handleCancel();
                }}
                className="px-4 py-2 bg-gray-200 rounded"
              >
                CANCEL
              </button>
              <button
                onClick={(e) => {
                  console.log("asdfasdfasdd");
                  console.log("Image:", newimage);
                  handleSubmitModal(type, e);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                DONE
              </button>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};
export default AddCategoryForm;
