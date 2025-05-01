import React, { useState, useEffect } from "react";
import SearchBox from "../../../GeneralComponent/SearchBox/SearchBox";
import {
  selectSearchRestaurant,
  resetRestaurants,
  selectApiLoading,
  selectApiError,
} from "../../../../redux/slices/restaurant";
import search from "../../../../assets/images/prime_search.svg";
import { useDispatch, useSelector } from "react-redux";
import star from "../../../../assets/images/star.svg";

const RestaurantPopup = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const restaurants = useSelector(selectSearchRestaurant);
  console.log("what is the other restaurant", restaurants);
  // Fetch restaurants based on search input
  useEffect(() => {
    const fetchRestaurants = async () => {
      if (searchTerm.trim() === "") {
        dispatch(resetRestaurants());
        return;
      }

      dispatch(selectSearchRestaurant(searchTerm));
      console.log(restaurants);
    };

    const delayDebounce = setTimeout(fetchRestaurants, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm, dispatch]);

  // Handle restaurant selection
  const handleSelectRestaurant = (restaurant) => {
    setSelectedRestaurants((prev) => [...prev, restaurant]);
    setSearchTerm("");
    dispatch(resetRestaurants());
  };
  const getCurrentDayHours = (openingHours) => {
    const daysOfWeek = [
      "Friday",
      "Monday",
      "Sunday",
      "Tuesday",
      "Saturday",
      "Thursday",
      "Wednesday",
    ];
    const currentDay = new Date().getDay();
    const currentDayName = daysOfWeek[currentDay];
    const CurrentDayHours =
      openingHours[currentDayName] || "Hours not available";
    return `${CurrentDayHours}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-2/6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Restaurant</h2>
          <button onClick={onClose} className="text-xl font-bold">
            &times;
          </button>
        </div>

        {/* Search Box */}
        <SearchBox
          placeholder="Search for restaurant by name..."
          img={search}
          className="w-full h-16"
          onSearch={(value) => setSearchTerm(value)}
          value={searchTerm}
        />
        {/* Search Results Dropdown */}
        {loading && <p className="text-center mt-2">Loading...</p>}
        {restaurants.length > 0 && (
          <div className="border border-gray-300 bg-[#FFFFFF] rounded mt-2 max-h-60 overflow-y-auto p-2">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.restaurant_id}
                className="flex items-center border bg-[#FFFFFF] border-gray-200 rounded-lg p-3 mb-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectRestaurant(restaurant)}
              >
                {/* Left: Restaurant Image */}
                <img
                  src={restaurant.image || "/placeholder-image.png"}
                  alt={restaurant.name}
                  className="w-16 h-16 rounded-lg object-cover mr-4"
                />

                {/* Right: Restaurant Details */}
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {restaurant.street_address_1}
                    {restaurant.street_address_2}
                  </p>
                  <p className="text-sm text-gray-600"> </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Selected Restaurants Display */}
        {selectedRestaurants.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Selected Restaurants</h3>
            <ul className="space-y-1">
              {selectedRestaurants.map((restaurant) => (
                <div
                  key={restaurant.restaurant_id}
                  className="flex  border border-gray-200 rounded-lg p-3 mb-2 shadow-sm bg-[#FFFFFF] hover:bg-gray-100 cursor-pointer"
                >
                  {/* Left: Restaurant Image */}
                  <img
                    src={restaurant.image || "/placeholder-image.png"}
                    alt={restaurant.logo}
                    className="w-16 h-16 rounded-lg object-cover mr-4"
                  />

                  {/* Right: Restaurant Details */}
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {restaurant.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {restaurant.street_address_1}
                      {restaurant.street_address_2}
                    </p>

                    <div className="flex flex-row gap-3">
                      <p className="text-sm text-[#FFFFFF] w-2/12 flex justify-items-start pl-2 gap-2 rounded-md bg-green-600 border-[0.1px]">
                        {" "}
                        <img src={star} alt="" /> {restaurant.average_rating}
                      </p>
                      <p className="text-sm text-gray-600">
                        {restaurant.number_of_ratings} ratings
                      </p>
                    </div>
                    <p className="text-sm text-gray-600">
                      {restaurant.primary_phone} {restaurant.secondary_phone}
                    </p>
                    <p className="text-sm text-gray-600">
                      Timings: {getCurrentDayHours(restaurant.opening_hours)}
                    </p>
                  </div>
                </div>
              ))}
            </ul>
            <div className="flex justify-end flex-row gap-4 my-5">
              <button className="px-9 py-1 border-[#C0C0C0] border-[1px] bg-[#FFFFFF] text-[#464E5B] rounded-md">
                Clear
              </button>
              <button className="px-9 py-1 border-[#2D5FDD] border-[1px] bg-[#2D5FDD] text-[#FFFFFF] rounded-md">
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPopup;
