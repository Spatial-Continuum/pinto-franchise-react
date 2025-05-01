import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RectangleCard from "../../../../GeneralComponent/FlexElement/RectangleCard.jsx";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout.jsx";
import { Menu as MenuIcon, Search, Upload } from "lucide-react";
import vector from "../../../../../assets/images/Vector_colorless.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react"; // For the drag handle
import axios from "axios";
import { fetchSubCategoryApi } from "../../../../../redux/slices/menu.js";
import {
  searchRestaurantByName,
  selectSearchResults,
  PostUpdateRestaurantRanking,
  DeleteRestaurant,
  selectApiLoading,
} from "../../../../../redux/slices/restaurant.js";
import { selectTopBrand } from "../../../../../redux/slices/menu.js";
import { fetchTopBrandApi } from "../../../../../redux/slices/menu.js";
function ShowTopBrand() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [TopBrands, setTopBrands] = useState(location?.state?.topbrands || []);
  const [loading, setLoading] = useState(false);
  const [singleSubCategory, setSingleSubCategory] = useState({});
  const [allEdit, setAllEdit] = useState(false);
  const [singleEdit, setSingleEdit] = useState(false);
  const [newitem, setNewItem] = useState("");
  const [newimage, setNewImage] = useState(null);
  const propsShowModal = location?.state?.showModal || false;
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [rearrangedList, setRearrangedList] = useState([]);

  let debounceTimeout = 0;

  const searchResults = useSelector(selectSearchResults);
  console.log("klsdjfpowekw", searchResults);
  useEffect(() => {
    if (propsShowModal) {
      setShowModal(true);
    }
  }, []);
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const handleOnDragEnd = (result) => {
    console.log("jkshilowje", result);
    if (!result.destination) return;
    const items = reorder(
      TopBrands,
      result.source.index,
      result.destination.index
    );
    let source_index = result.source.index;
    let destination_index = result.destination.index;

    const updatedItems = items.map((item, index) => {
      if (index === source_index) {
        return {
          ...item,
          ranking: source_index + 1,
        };
      } else if (index === destination_index) {
        return {
          ...item,
          ranking: destination_index + 1,
        };
      } else {
        return item;
      }
    });
    let updated_soc = updatedItems[source_index];
    let updated_des = updatedItems[destination_index];
    let updated_re = [...(rearrangedList || [])].filter(
      (item) =>
        item.restaurant_id !== updated_soc.restaurant.restaurant_id &&
        item.restaurant_id !== updated_des.restaurant.restaurant_id
    );

    updated_re.push({
      restaurant_id: updated_soc.restaurant.restaurant_id,
      ranking: updated_soc.ranking,
    });

    updated_re.push({
      restaurant_id: updated_des.restaurant.restaurant_id,
      ranking: updated_des.ranking,
    });
    console.log("alksdfjpoweo", updated_re);
    setRearrangedList(updated_re);
    setTopBrands(updatedItems);
  };
  useEffect(() => {
    console.log("Dispatching fetchSubCategoryApi");
    dispatch(fetchSubCategoryApi());
  }, [dispatch]);

  useEffect(() => {
    if (searchResults && Array.isArray(searchResults)) {
      setAllRestaurant(searchResults);
    }
  }, [searchResults]);

  const handleEditSubCatgory = (subcategory) => {
    console.log("akjsdfhkjashasdj;d");
    setSingleEdit(true);
    setShowModal(true);
    setNewItem(subcategory.subcategory_title);
    setNewImage(subcategory.image);
    setNewImagePreview(subcategory.image);
    setSingleSubCategory(subcategory);
  };
  const handleCancel = () => {
    setNewItem("");
    setAllRestaurant([]);
    setSelectedRestaurant([]);
    setShowModal(false);
  };
  const handleSubmitModal = (e) => {
    if (selectedRestaurant) {
      e.preventDefault();
      let formData = { restaurant_id: selectedRestaurant[0].restaurant_id };
      let type = singleEdit ? "put" : "post";
      let url_link = singleEdit
        ? `${API_URL}/menu/subcategory/${singleSubCategory.subcategory_id}`
        : `${API_URL}/restaurant/merchant/toprestaurants`;

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
          console.log("jsdjflasl", response.data.data);

          console.log(response);

          setNewItem("");
          setAllRestaurant([]);
          setSelectedRestaurant([]);
          setShowModal(false);
          dispatch(fetchTopBrandApi())
            .unwrap()
            .then((data) => {
              console.log("ksaljdflkw", data);
              setTopBrands(data);
            })
            .catch((err) => {
              console.log("alksdjflksd");
            });
        })
        .catch(function (error) {
          console.log("error one");
          console.log(error);
        });
    }
  };
  const handleRearrange = (e) => {
    console.log("aklsdjw", rearrangedList);
    e.preventDefault();
    dispatch(PostUpdateRestaurantRanking({ ranking_updates: rearrangedList }))
      .unwrap()
      .then((response) => {
        console.log("Update successful!", response);
      })
      .catch((error) => {
        console.error("Update failed:", error);
        // show error message
      });
  };
  const handleDelete = (e, data) => {
    console.log("aklsdfjoie", data);
    e.preventDefault();
    dispatch(DeleteRestaurant({ ranking_updates: data.top_restaurant_id }))
      .unwrap()
      .then((response) => {
        dispatch(fetchTopBrandApi())
          .unwrap()
          .then((data) => {
            console.log("ksaljdflkw", data);
            setTopBrands(data);
          })
          .catch((err) => {
            console.log("alksdjflksd");
          });
      })
      .catch((error) => {
        console.error("Update failed:", error);
        // show error message
      });
  };
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setNewItem(value);
    setLoading(true);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value.trim()) {
        try {
          dispatch(searchRestaurantByName(value));
        } catch (error) {
          console.error("Error searching restaurants:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setAllRestaurant([]);
        setLoading(false);
      }
    }, 500);
  };
  const handleAddRestaurat = (res) => {
    setSelectedRestaurant((previtem) => [...previtem, res]);
    setNewItem("");
    setAllRestaurant([]);
  };
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() =>
        navigate("/menu/manage-screen", { state: { TopBrands } })
      }
    >
      <div className="p-6">
        <div>
          <div className="relative mb-8">
            <h2 className="text-lg font-semibold"> Top brands</h2>
            <div className="flex justify-between items-center">
              <div>
                <input
                  type="text"
                  placeholder="Search here"
                  className="border border-gray-300 mt-2 rounded-lg px-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  value={newitem}
                  onChange={handleChangeSearch}
                />
                <Search className="w-5 h-5 absolute left-3 top-10 text-gray-400" />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setAllEdit(!allEdit)}
                  className="p-2 text-black rounded-lg border border-black flex item-center"
                >
                  <img src={vector} alt="Edit" className="mt-2 mr-2" />
                  Edit
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className=" px-2 bg-green-600 text-white rounded-lg "
                >
                  Add Top brands
                </button>
              </div>
            </div>
          </div>
          <div className="mb-8">
            <div
              className={`${
                allEdit ? "pl-12" : "pl-4"
              } flex justify-between items-center w-[600px]`}
            >
              <h3 className="text-lg font-semibold">Top brands</h3>
              {allEdit ? (
                <button
                  className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-md bg-white "
                  onClick={handleRearrange}
                >
                  Rearrange
                </button>
              ) : (
                ""
              )}
            </div>

            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="topBrands">
                {(provided) => (
                  <div
                    className="p-4 flex flex-col gap-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {TopBrands.map((topbrand, index) => (
                      <Draggable
                        key={topbrand.restaurant.restaurant_id}
                        draggableId={topbrand.restaurant.restaurant_id.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="flex items-center gap-2"
                          >
                            {console.log("aklsdjoiwje", provided)}
                            {allEdit && (
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="cursor-grab" />
                              </div>
                            )}
                            <RectangleCard
                              title={topbrand.restaurant.name}
                              image={topbrand.restaurant.logo}
                              props={topbrand}
                              doorNo={topbrand.restaurant.door_no}
                              address1={topbrand.restaurant.street_address_1}
                              address2={topbrand.restaurant.street_address_2}
                              city={topbrand.restaurant.city}
                              pincode={topbrand.restaurant.pincode}
                              primaryphone={topbrand.restaurant.primary_phone}
                              secondaryphone={
                                topbrand.restaurant.secondary_phone
                              }
                              number_of_ratings={topbrand.ranking}
                              headerstyle={"min-w-[600px] max-w-[500px]"}
                              opening_hours={topbrand.opening_hours}
                            />
                            {allEdit ? (
                              <button
                                className="h-10 px-4 text-sm border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition-all mt-2"
                                onClick={(e) => handleDelete(e, topbrand)} // optional if you want to implement delete
                              >
                                Delete
                              </button>
                            ) : (
                              ""
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        </div>
      </div>
      {console.log("aslfjasdfas", singleEdit)}
      {showmodal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Add Top Brand</h2>
              <button
                onClick={() => {
                  handleCancel();
                }}
              >
                &times;
              </button>
            </div>

            {/* Cuisine Title Input */}
            <div className="mb-4 relative">
              <label className="block mb-1">Search Restaurant</label>
              <div>
                <input
                  type="text"
                  className="w-full border p-2 pl-10 rounded"
                  placeholder={`Sub Category title`}
                  value={newitem}
                  onChange={handleChangeSearch}
                />
                <Search className="w-5 h-5 absolute left-2 top-10 text-gray-400" />
              </div>
              {/* {loading && <p className="text-gray-400 mt-2">Loading...</p>} */}
              {allRestaurant.length > 0 && (
                <ul className=" z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto bg-gray-100">
                  {allRestaurant.map((topbrand) => (
                    <>
                      {console.log("akjsdoie", topbrand)}
                      <li
                        key={topbrand.top_restaurant_id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => {
                          console.log("rested name");
                          handleAddRestaurat(topbrand);
                        }}
                      >
                        <RectangleCard
                          key={topbrand.restaurant_id}
                          title={topbrand.name}
                          image={topbrand.logo}
                          props={topbrand}
                          doorNo={topbrand.door_no}
                          address1={topbrand.street_address_1}
                          address2={topbrand.street_address_2}
                          city={topbrand.city}
                          pincode={topbrand.pincode}
                        />
                      </li>
                    </>
                  ))}
                </ul>
              )}

              {selectedRestaurant.length > 0 && (
                <>
                  <div> Selected Restaurant </div>
                  {selectedRestaurant.map((res) => (
                    <RectangleCard
                      key={res.restaurant_id}
                      title={res.name}
                      image={res.logo}
                      doorNo={res.door_no}
                      address1={res.street_address_1}
                      address2={res.street_address_2}
                      city={res.city}
                      pincode={res.pincode}
                    />
                  ))}
                </>
              )}
            </div>
            {<p></p>}
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
export default ShowTopBrand;
