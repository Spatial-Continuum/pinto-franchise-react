import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllNewRestaurants,
  selectApiError,
  selectApiLoading,
  getNewRestaurants, // Action to fetch restaurants
} from "../../redux/slices/restaurant";

const NewRestaurants = ({searchTerm}) => {
  const [showAll, setShowAll] = useState(false); // Toggle between showing all or top 4
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const restaurants = useSelector(selectAllNewRestaurants);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);

  // Fetch new restaurants on component mount
  useEffect(() => {
    dispatch(getNewRestaurants()); // Correct action to fetch data
  }, [dispatch]);

  // Helper function: Check if restaurant was updated in the last 30 days
  const isUpdatedWithin30Days = (updatedAt) => {
    const now = new Date();
    const updatedDate = new Date(updatedAt);
    const diffInDays = (now - updatedDate) / (1000 * 60 * 60 * 24); // Difference in days
    return diffInDays <= 30;
  };

  // Filter restaurants updated in the last 30 days
  const newRestaurants = restaurants?.filter((restaurant) =>
    isUpdatedWithin30Days(restaurant.updated_at)
  );

  const filteredRestaurants = searchTerm
    ? newRestaurants?.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : newRestaurants;

  // Helper function: Calculate total items for a list of restaurants
  const calculateTotalItems = (restaurants) => {
    return restaurants?.reduce((total, restaurant) => {
      return (
        total +
        (restaurant.menu_categories?.reduce((categoryTotal, category) => {
          return categoryTotal + (category.items?.length || 0);
        }, 0) || 0)
      );
    }, 0);
  };
    const getCurrentDayHours = (openingHours) => {
        const daysOfWeek = [

            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
        ];
        const currentDay = new Date().getDay();
        const currentDayName = daysOfWeek[currentDay];
        const CurrentDayHours = openingHours[currentDayName] || "Hours not available";
        return `${CurrentDayHours}`;
    };

  // Determine which restaurants to display
  const displayedRestaurants = showAll ? filteredRestaurants : filteredRestaurants?.slice(0, 4);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-left text-2xl font-bold">New Restaurants</h1>
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-4 py-2 text-black font-bold rounded-md"
        >
          {showAll ? "Show Less" : "View All"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center">
        {displayedRestaurants.map((restaurant) => (
          <div
            key={restaurant.restaurant_id}
            className="flex flex-col items-start border bg-[#FFFFFF] border-gray-300 shadow-lg rounded-lg w-[260px] h-[140px] p-3"
            onClick={() =>
              navigate(`/menu/restaurant-item/addmenu/${restaurant.restaurant_id}`)
            }
          >
            <div className="flex items-center w-full">
              <img
                src={restaurant.logo}
                alt={`${restaurant.name}`}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex flex-col justify-center ml-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-500">{restaurant.street_address_1}{restaurant.street_address_2}</p>
              </div>
            </div>

            <div className="flex justify-between w-full text-sm text-[#752B0AC9] mt-auto">
              <span>
                <strong className="text-sm ">{getCurrentDayHours(restaurant.opening_hours)}</strong> 
              </span>
              <span>
                <strong className="text-sm">Items:</strong> {calculateTotalItems([restaurant])}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewRestaurants;
