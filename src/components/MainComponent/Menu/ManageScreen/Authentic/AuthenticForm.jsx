import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout";
import Group from "../../../../../assets/images/Group.png";
import { Search, Upload } from "lucide-react";
import ImageChange from "../../../../../assets/images/Image-change.png";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import RectangleCard from "../../../../GeneralComponent/FlexElement/RectangleCard.jsx";
import {
  selectSearchResults,
  searchRestaurantByName,
} from "../../../../../redux/slices/restaurant.js";
import {
  fetchAuthenticateApi,
  selectAutheticate,
} from "../../../../../redux/slices/menu.js";
const AddAuthenticForm = () => {
  const fileInoutRef = useRef();
  const location = useLocation();
  const authentics = location?.state?.Authetics || [];
  const singleAuthentic = location.state?.Authetic || {};
  const edit = location?.state?.edit || false;
  const [searchTerm, setSearchTerm] = useState("");
  const [formstate, setFormState] = useState({
    list_restaurant: [],
    title: "",
  });
  const qrestaurants = useSelector(selectAutheticate);
  const [selectedRestaurant, setSelectedRestaurant] = useState(
    location?.state?.singleAuthentic || []
  );
  const [loading, setLoading] = useState(false);
  const [allRestaurant, setAllRestaurant] = useState([]);
  let debounceTimeout;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchResults = useSelector(selectSearchResults);

  const handleChangeSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
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

  useEffect(() => {
    if (searchResults && Array.isArray(searchResults)) {
      setAllRestaurant(searchResults);
    }
  }, [searchResults]);
  const handleAddRestaurat = (res) => {
    setSelectedRestaurant((prevItems) => {
      console.log("klsjflkwe", prevItems);
      const alreadyExists = prevItems.some(
        (item) => item.restaurant_id === res.restaurant_id
      );
      if (!alreadyExists && prevItems.length < 1) {
        return [...prevItems, res];
      }
      return prevItems;
    });
    setAllRestaurant([]);
  };
  const getInfo = () => {
    dispatch(fetchAuthenticateApi());
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("sadfsdsds", selectedRestaurant);
    const formData = {};
    const restaurant_ids =
      selectedRestaurant && selectedRestaurant[0]?.restaurant_id;
    if (edit) {
      formData["authentic_cooking"] = false;
    } else {
      formData["authentic_cooking"] = true;
    }

    let type = "put";
    let api = `${API_URL}/restaurant/merchant/authentic-restaurants/${restaurant_ids}`;

    axios[type](api, formData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (response) {
        console.log(response);
        setFormState({
          title: "",
          dropdownOpen: false,
          imagePreview: null,
        });
        setSelectedRestaurant([]);
        getInfo();
        navigate("/menu/manage-screen/show-authentic", {
          state: { Authentic: qrestaurants },
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleCacel = () => {
    setFormState({
      title: "",
      subCategory: "",
      selectedCuisines: [],
      dropdownOpen: false,
      imagePreview: null,
    });
    setSelectedCuisineIds([]);
    setSelectedRestaurant([]);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  const handleRemoveItem = (index) => {
    const updatedData = [...selectedRestaurant];
    updatedData.splice(index, 1);
    setSelectedRestaurant(updatedData);
  };
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDrop = (event, targetIndex) => {
    event.preventDefault();
    const sourceIndex = event.dataTransfer.getData("index");
    const updatedData = [...selectedRestaurant];
    [updatedData[sourceIndex], updatedData[targetIndex]] = [
      updatedData[targetIndex],
      updatedData[sourceIndex],
    ];
    setSelectedRestaurant(updatedData);
  };
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() => {
        navigate("/menu/manage-screen/show-authentic", {
          state: { Authentic: qrestaurants },
        });
      }}
    >
      <div className="m-6">
        <h2 className="text-lg font-semibold">
          {" "}
          {edit ? "Edit " : "Add New "}Restaurant
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border rounded-lg m-2">
            <div className="flex ">
              <div className="mb-6 ml-8 relative ">
                <label className="block text-sm mb-2">Search Restaurant</label>
                <div className="mb-4 relative">
                  <div>
                    <input
                      type="text"
                      placeholder="Enter to add"
                      className="border border-gray-300 rounded-lg px-3 pl-10 py-2 w-56"
                      value={searchTerm}
                      onChange={handleChangeSearch}
                    />
                    <Search className="w-5 h-5 absolute left-2 top-3 text-gray-400" />
                  </div>
                  {allRestaurant.length > 0 && (
                    <ul className=" z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto bg-gray-100">
                      {allRestaurant.map((topbrand) => (
                        <>
                          {console.log("akjsdoie", topbrand)}
                          <li
                            key={topbrand?.top_restaurant_id}
                            className=" cursor-pointer hover:bg-gray-100"
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
                </div>
                {loading && <p className="text-gray-400 mt-2">Loading...</p>}
                <div>
                  <label className="block text-sm mt-6 mb-4">
                    Selected Restaurant
                  </label>

                  <div className="grid grid-cols-4 gap-4">
                    {selectedRestaurant?.map((item, index) => (
                      <div
                        key={item?.restaurant_id}
                        draggable
                        onDragStart={(event) => handleDragStart(event, index)}
                        onDragOver={handleDragOver}
                        onDrop={(event) => handleDrop(event, index)}
                      >
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span className="ml-2">
                            <img src={Group} />
                          </span>
                          <span className="ml-2">{item?.name}</span>
                          <span
                            className="ml-2"
                            onClick={() => handleRemoveItem(index)}
                          >
                            x
                          </span>
                        </div>
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="border w-44 h-40"
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
                    {edit ? "Update " : "Add "} Restaurant
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
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
export default AddAuthenticForm;
