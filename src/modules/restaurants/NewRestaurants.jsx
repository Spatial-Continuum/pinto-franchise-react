import React, { useState,useEffect } from 'react';

import RestaurantService from './RestaurantService';

const NewRestaurants = () => {
    const [showAll, setShowAll] = useState(false); // State to toggle between showing all data or just the first 4
    const [filteredRestaurants, setFilteredRestaurants] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // Toggle the view to show all restaurants
    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                setLoading(true);
                const data = await RestaurantService.getallRestaurants();
                const updatedRestaurants = data.filter((restaurant) =>
                    isUpdatedWithin30Days(restaurant.updated_at)
                );
                setRestaurants(updatedRestaurants);
                setFilteredRestaurants(updatedRestaurants.slice(0, 4)); // Default to showing the first 4
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch restaurants.');
                setLoading(false);
            }
        };

        fetchRestaurants();
    }, []);
    
    const isUpdatedWithin30Days = (updatedAt) => {
        const now = new Date();
        const updatedDate = new Date(updatedAt);
        const diffInDays = (now - updatedDate) / (1000 * 60 * 60 * 24); // Difference in days
        return diffInDays <= 30;
    };
    const calculateTotalItems = (restaurants) => {
        return restaurants?.reduce((total, restaurant) => {
            return total + (restaurant.menu_categories?.reduce((categoryTotal, category) => {
                return categoryTotal + (category.items?.length || 0);
            }, 0) || 0);
        }, 0);
    };

    const toggleView = () => {
        if (showAll) {
            setFilteredRestaurants(restaurants.slice(0, 4)); // Show first 4
        } else {
            
            setFilteredRestaurants(restaurants);
        }
        setShowAll(!showAll);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }


    
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 gap-4 justify-center">
                {filteredRestaurants.map((restaurant, index) => (
                    <div
                        key={index}
                        className="flex flex-col items-start border bg-[#FFFFFF] border-gray-300 shadow-lg rounded-lg w-[260px] h-[140px]  p-3"
                    >
                        <div className="flex items-center  w-full">
                            <img
                                src={restaurant.image}
                                alt={`${restaurant.name} logo`}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex flex-col justify-center ml-4">
                                <h3 className="font-semibold text-lg text-gray-800">
                                    {restaurant.name}
                                </h3>
                                <p className="text-sm text-gray-500">{restaurant.address}</p>
                            </div>
                        </div>

                        <div className="flex justify-between w-full text-sm text-orange-400 mt-auto">
                            <span>
                                <strong>Cuisines:</strong> {restaurant.noOfCuisines}
                            </span>
                            <span>
                                <strong>Items:</strong> {calculateTotalItems([restaurant])}
                            </span>
                        </div>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default NewRestaurants;
