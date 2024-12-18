import React, { useEffect, useState } from "react";

import RestaurantService from "./RestaurantService";

const RestaurantList = () => {

  const [restaurants, setRestaurants] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchRestaurants = async () => {
    try{
      const data =  await  RestaurantService.getallRestaurants();
      setRestaurants(data)
    }catch(err){
      setError("Failed to fetch restaurants. Please try again later.");
    } finally {
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchRestaurants()
  },[])

  const calculateItems = (menuCategories) => {
    return menuCategories?.reduce((total, category) =>{
      return total + (category.items?.length || 0)
    },0)
  }
  if (loading) return <p>Loadng...</p>
  if (error)  return <p>Error: {error}</p>
  return (
    <div className="p-6">
      <h1 className="text-left text-2xl font-bold mb-6"> All Restaurants</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.restaurant_id}
            className="flex flex-col items-start bg-[#FFFFFF] border border-gray-300 shadow-lg rounded-lg w-[260px] h-[140px]  p-3"
          >
            <div className="flex items-center  " >
              <img
                src={restaurant.image}
                alt={`${restaurant.name} logo`}
                className="w-16 h-16 object-cover  rounded-md"
              />

              <div className="flex flex-col justify-center pl-3 ">
                <h3 className="font-semibold text-lg text-gray-800">
                  {restaurant.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{restaurant.address}</p>
              </div>
            </div>

            <div className="flex justify-between w-full  text-sm text-orange-400 mt-auto">
              <span>
                <strong>Cuisines:</strong> {restaurant.noOfCuisines}
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
