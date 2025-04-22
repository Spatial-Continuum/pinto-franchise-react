import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import RectangleCard from "../../../../GeneralComponent/FlexElement/RectangleCard.jsx";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout.jsx";
import { Menu as MenuIcon, Search, Upload } from "lucide-react";
import vector from "../../../../../assets/images/Vector_colorless.png";
import axios from "axios";
import { fetchSubCategoryApi } from "../../../../../redux/slices/menu.js";
import { selectSearchRestaurant } from "../../../../../redux/slices/restaurant.js";
function ShowTopBrand() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [TopBrands, setTopBrands] = useState(location?.state?.topbrands || []);

  const [singleSubCategory, setSingleSubCategory] = useState({});
  const [allEdit, setAllEdit] = useState(false);
  const [singleEdit, setSingleEdit] = useState(false);
  const [newitem, setNewItem] = useState("");
  const [newimage, setNewImage] = useState(null);
  const propsShowModal = location?.state.showModal || false;
  const [newImagePreview, setNewImagePreview] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Input value
  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [showmodal, setShowModal] = useState(false);
  const [allRestaurant, setAllRestaurant] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let debounceTimeout = 0;

  const searchResults = useSelector((state) => {
    try {
      return selectSearchRestaurant(state) || [];
    } catch (error) {
      console.error("Error accessing Redux state:", error);
      return [];
    }
  });

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
        })
        .catch(function (error) {
          console.log("error one");
          console.log(error);
        });
    }
  };
  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setNewItem(value);
    setIsLoading(true);

    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      if (value.trim()) {
        try {
          dispatch(searchRestaurantByName(value));
        } catch (error) {
          console.error("Error searching restaurants:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setAllRestaurant([]);
        setIsLoading(false);
      }
    }, 500);
  };
  const handleAddRestaurat = (res) => {
    setSelectedRestaurant((previtem) => [...previtem, res]);
    setNewItem("");
    setAllRestaurant([]);
  };
  useEffect(() => {
    if (searchResults && Array.isArray(searchResults)) {
      setAllRestaurant(searchResults);
    }
  }, [searchResults]);

  useEffect(() => {
    if (propsShowModal) {
      setShowModal(true);
    }
  }, [propsShowModal]);

  useEffect(() => {
    try {
      dispatch(fetchSubCategoryApi());
      const a = dispatch(selectSearchRestaurant());
      console.log("next data", a);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  }, [dispatch]);

  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() =>
        navigate("/menu/manage-screen", { state: { subcategories } })
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
                {isLoading && (
                  <div className="text-sm text-gray-500 mt-1">Loading...</div>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setAllEdit(true)}
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
            <h3 className="text-lg font-semibold">Top brands</h3>
            {/* <div className="flex flex-wrap gap-5"> */}
            {TopBrands.map((topbrand) => {
              console.log("top brand top brand top brand", topbrand);
              return (
                <RectangleCard
                  key={topbrand.restaurant.restaurant_id}
                  title={topbrand.restaurant.name}
                  image={topbrand.restaurant.logo}
                  props={topbrand}
                  doorNo={topbrand.restaurant.door_no}
                  address1={topbrand.restaurant.street_address_1}
                  address2={topbrand.restaurant.street_address_2}
                  city={topbrand.restaurant.city}
                  pincode={topbrand.restaurant.pincode}
                  primaryphone={topbrand.restaurant.primary_phone}
                  secondaryphone={topbrand.restaurant.secondary_phone}
                  number_of_ratings={topbrand.ranking}
                  opening_hours={topbrand.opening_hours}
                />
              );
            })}
            {/* </div> */}
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
              {isLoading && <p className="text-gray-400 mt-2">Loading...</p>}
              {allRestaurant.length > 0 && (
                <ul className=" z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto bg-gray-100">
                  {allRestaurant.map((topbrand) => (
                    <li
                      key={topbrand.top_restaurant_id}
                      className="p-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        console.log("rested name");
                        handleAddRestaurat(topbrand.restaurant);
                      }}
                    >
                      <RectangleCard
                        key={topbrand.restaurant.restaurant_id}
                        title={topbrand.restaurant.name}
                        image={topbrand.restaurant.logo}
                        props={topbrand}
                        doorNo={topbrand.restaurant.door_no}
                        address1={topbrand.restaurant.street_address_1}
                        address2={topbrand.restaurant.street_address_2}
                        city={topbrand.restaurant.city}
                        pincode={topbrand.restaurant.pincode}
                      />
                    </li>
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
