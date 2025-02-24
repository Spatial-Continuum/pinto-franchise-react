import React, { useEffect, useState } from "react";



import { useNavigate } from "react-router-dom";
import { selectRestaurantList, selectApiError, selectApiLoading, getRestaurantList ,getAllRestaurantSuccess ,selectSuccessRestaurants} from "../../redux/slices/restaurant";
import { useDispatch, useSelector } from "react-redux";

const RestaurantList = ({searchTerm}) => {
  const dispatch = useDispatch();
  

  const restaurants = useSelector(selectSuccessRestaurants)
  const loading = useSelector(selectApiLoading)
  const error = useSelector(selectApiError)

  const navigate = useNavigate();



  useEffect(() => {
    dispatch(getAllRestaurantSuccess())
  
  }, [dispatch]);

  const calculateItems = (menuCategories) => {
    return menuCategories?.reduce((total, category) => {
      return total + (category.items?.length || 0)
    }, 0)
  }

  const filteredRestaurants = searchTerm
    ? restaurants?.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : restaurants;

  const getCurrentDayHours = (openingHours) => {
    const daysOfWeek = [

        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"



    ];
    const currentDay = new Date().getDay();
    const currentDayName = daysOfWeek[currentDay];
    const CurrentDayHours = openingHours[currentDayName] || "Hours not available";
    return `${CurrentDayHours}`;
};


  if (loading) return <p>Loadng...</p>
  if (error) return <p>Error: {error}</p>
  return (
    <div className="mt-8">
      <h1 className="text-left text-2xl font-bold mb-6"> All Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center">
        {filteredRestaurants.map((restaurant) => (
          <div
            key={restaurant.restaurant_id}
            className="flex flex-col items-start bg-[#FFFFFF] border border-gray-300 shadow-lg rounded-lg w-[300px] h-[170px]  p-3"
            onClick={() => navigate(`/menu/restaurant-item/addmenu/${restaurant.restaurant_id}`)}
          >
            <div className="flex items-center  " >
              <img
                src={restaurant.logo}
                alt={`${restaurant.image}`}

                className="w-16 h-16 object-cover  rounded-md"
              />

              <div className="flex flex-col justify-center pl-3 ">
                <h3 className="font-semibold text-lg text-gray-800">
                  {restaurant.name}
                </h3>

                <p className="text-sm text-gray-500 mb-2">{restaurant.street_address_1},{restaurant.street_address_2}</p>
                <p className="text-sm text-gray-500">{restaurant.landmark}&nbsp;{restaurant.city}&nbsp;{restaurant.pincode}</p>
              </div>
            </div>

            <div className="flex justify-between w-full  text-sm text-[#752B0AC9] mt-auto">
              <span>
                <strong>{getCurrentDayHours(restaurant.opening_hours)}</strong> 
              </span>
              <span>
                <strong>Items:</strong> {calculateItems(restaurant.menu_categories)}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
