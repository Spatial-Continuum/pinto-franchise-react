import React from "react";
import RestaurantData from '../../modules/restaurants/RestaurantsData';

const RestaurantList = () => {
  return (
    <div className="p-6">
      <h1 className="text-left text-2xl font-bold mb-6"> All Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
        {RestaurantData.map((restaurant, index) => (
          <div
            key={index}
            className="flex flex-col items-start border border-gray-300 shadow-lg rounded-lg w-[260px] h-[140px]  p-3"
          >
            <div className="flex items-center  " >
              <img
                src={restaurant.image}
                alt={`${restaurant.restaurantName} logo`}
                className="w-16 h-16 object-cover  rounded-md"
              />

              <div className="flex flex-col justify-center pl-3 ">
                <h3 className="font-semibold text-lg text-gray-800">
                  {restaurant.restaurantName}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.branchName}</p>
              </div>
            </div>

            <div className="flex justify-between w-full  text-sm text-orange-400 mt-auto">
              <span>
                <strong>Cuisines:</strong> {restaurant.noOfCuisines}
              </span>
              <span>
                <strong>Items:</strong> {restaurant.noOfItems}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
