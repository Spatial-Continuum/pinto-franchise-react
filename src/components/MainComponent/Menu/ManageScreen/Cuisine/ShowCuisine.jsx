import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import ShowImagewithBlackElement from "../../../../GeneralComponent/FlexElement/ShowImagewithBlackElement.jsx";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout.jsx";
import { fetchCuisineApi } from "../../../../../redux/slices/menu.js";
import { Menu as MenuIcon, Search, Upload } from "lucide-react";
import ShowFlexElements from "../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx";
function ShowCuisine(props) {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [cuisines, setCuisine] = useState(location?.state?.cuisines || []);
  const propsShowModal = location?.state.showModal || false;
  const [categoryName, setCuisineName] = useState("");
  const [cuisineName, setSubCuisineName] = useState("");
  const [singleCuisine, setSinlgeCuisine] = useState({});
  const [singleSubCuisine, setSinlgeSubCuisine] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newitem, setNewItem] = useState("");
  const [newimage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Input value
  const [catIndex, setCatIndex] = useState("");
  const [subcatIndex, setSubCatIndex] = useState("");
  console.log("veetai illai mailsads", cuisines);
  useEffect(() => {
    if (propsShowModal) {
      setShowModal(true);
    }
  }, []);
  useEffect(() => {
    console.log("Dispatching fetchCuisineApi");
    dispatch(fetchCuisineApi());
  }, [dispatch]);
  console.log("lkasjfdjlfsa", singleCuisine);

  const handleCuisine = (singleCus, subcuisine, index = "") => {
    setSubCuisineName(singleCus);
    setSubCatIndex(index);
    setSinlgeSubCuisine(singleCus);
    // setNewItem(singleCus.cuisine_title);
    // setNewImage(singleCus.image);
    // setNewImagePreview(singleCus.image);
  };
  const handleSubcategory = (singleCat, categories, index = "") => {
    setCuisineName(singleCat.cuisine_title);
    setCatIndex(index);
    setSinlgeCuisine(singleCat);
    console.log("sdfasdfadfasd", singleCuisine);
    setNewItem(singleCat.cuisine_title);
    setNewImage(singleCat.image);
    setNewImagePreview(singleCat.image);
    if (index == "edit") setShowModal(true);
  };
  const handleCancel = () => {
    setNewItem("");
    setNewImage(null);
    setNewImagePreview(null);
    setShowModal(false);
  };
  const handleSubmitModal = (e) => {
    console.log("7777777", singleCuisine);
    if (newitem && newimage) {
      e.preventDefault();
      const formData = new FormData();
      let url_link = Object.keys(singleCuisine).length
        ? `${API_URL}/menu/cuisine/${singleCuisine.cuisine_id}`
        : `${API_URL}/menu/cuisine`;
      let type = Object.keys(singleCuisine).length ? "put" : "post";
      formData.append("cuisine_title", newitem);
      if (newimage) {
        formData.append("image", newimage);
      }

      if (!url_link) {
        return;
      }
      axios[type](url_link, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(function (response) {
          const data = response.data.data;
          dispatch(fetchCuisineApi()).then((response) => {
            if (response && response.payload) {
              setCuisine(response.payload); // Updates cuisines
            }
          });
          console.log("jsdjflasl", response.data.data);

          setNewItem("");
          setNewImage(null);
          setNewImagePreview(null);
          singleCategory = {};
          setUpdateOne(true);

          console.log("true event");
        })
        .catch(function (error) {
          console.log("error one");
          console.log(error);
        });
    }
  };
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() =>
        navigate("/menu/manage-screen", { state: { cuisines } })
      }
    >
      <div className="p-6">
        <div>
          <div className="relative mb-8">
            <h2 className="text-lg font-semibold">Cuisine</h2>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="text"
                  placeholder="Search here"
                  className="border border-gray-300 mt-2 rounded-lg px-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <Search className="w-5 h-5 absolute left-3 top-10 text-gray-400" />
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Add new cuisine
              </button>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-5">
              {cuisines.map((cuisine, index) => (
                <>
                  <ShowImagewithBlackElement
                    category={cuisine}
                    bottomName={true}
                    edit={true}
                    title={cuisine.cuisine_title}
                    setSub={() => {
                      handleSubcategory(cuisine, cuisines, index);
                    }}
                    onEdit={() => {
                      handleSubcategory(cuisine, cuisines, "edit");
                    }}
                  />
                  {categoryName && catIndex == index ? (
                    <div className="my-8 w-full">
                      <h2 className="text-lg font-semibold">
                        Sub Categories in {categoryName}{" "}
                      </h2>
                      <div className="border border-gray-200 rounded-lg">
                        <div className="flex flex-wrap gap-4  m-4">
                          {console.log("klsadfkljsdw", singleCuisine)}
                          {singleCuisine.categories?.map(
                            (subcategory, index1) => (
                              <ShowFlexElements
                                category={subcategory}
                                title={subcategory.category_title}
                                bottomName={true}
                                style={"w-36 h-30"}
                                setSub={() => {
                                  handleCuisine(
                                    subcategory.cuisines,
                                    subcategory.cuisines,
                                    index1
                                  );
                                }}
                                onEdit={() => {
                                  handleCuisine(
                                    subcategory.cuisines,
                                    subcategory.cuisines,
                                    "edit"
                                  );
                                }}
                              />
                            )
                          )}
                        </div>
                        {cuisineName ? (
                          <div className="flex flex-wrap gap-4  m-4">
                            {cuisineName?.map((subcategory) => (
                              <ShowFlexElements
                                category={subcategory}
                                title={subcategory.cuisine_title}
                                topName={true}
                                style={"w-36 h-30"}
                              />
                            ))}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add New Cuisine</h2>
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
              <label className="block mb-1">Enter Cuisine title</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder={`Cuisine title`}
                value={newitem}
                onChange={(e) => setNewItem(e.target.value)}
              />
            </div>

            {/* Image Upload */}

            <label className="block mb-1">Add image</label>
            <div
              className="mb-4 w-[50%] border border-gray-300 rounded-lg p-8 w-64 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
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
                    setNewImagePreview(URL.createObjectURL(e.target.files[0]));
                }}
                style={{ display: "none" }}
              />
              {console.log("newluasifoalsdfjasld", newImagePreview)}
              {!newimage ? <Upload className="w-8 h-8 text-gray-400" /> : ""}

              {newImagePreview || newimage ? (
                <img
                  src={newImagePreview}
                  alt="Preview"
                  className="w-32 h-32 object-fit rounded-lg mb-2"
                />
              ) : (
                <div>
                  <span className="text-gray-500">Choose image</span>
                </div>
              )}
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
                  handleSubmitModal(e);
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
}
export default ShowCuisine;
