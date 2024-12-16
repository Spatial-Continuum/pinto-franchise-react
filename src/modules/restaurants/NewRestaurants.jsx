import React, { useState } from 'react';
import RestaurantData from '../../modules/restaurants/RestaurantsData';

const NewRestaurants = () => {
    const [showAll, setShowAll] = useState(false); // State to toggle between showing all data or just the first 4

    // Toggle the view to show all restaurants
    const toggleView = () => {
        setShowAll(!showAll);
    };

    const restaurantsToShow = showAll ? RestaurantData : RestaurantData.slice(0, 4); // Show all or the first 4 restaurants

    return (
        <div className="p-6">
            <div className='flex items-center justify-between  mb-3'>
                <h1 className="text-left text-2xl  font-bold ">New Restaurants</h1>


                <button
                    onClick={toggleView}
                    className="px-4 py-2  text-black font-bold rounded-md "
                >
                    {showAll ? 'Show Less' : 'View All'}
                </button>


            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-center">
                {restaurantsToShow.map((restaurant, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start border border-gray-300 shadow-lg rounded-lg w-[260px] h-[140px]  p-3"
                    >
                        <div className="flex items-center w-full">
                            <img
                                src={restaurant.image}
                                alt={`${restaurant.restaurantName} logo`}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-center ml-4">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {restaurant.restaurantName}
                                </h3>
                                <p className="text-sm text-gray-500">{restaurant.branchName}</p>
                            </div>
                        </div>

                        <div className="flex justify-between w-full text-sm text-orange-400 mt-auto">
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

export default NewRestaurants;
