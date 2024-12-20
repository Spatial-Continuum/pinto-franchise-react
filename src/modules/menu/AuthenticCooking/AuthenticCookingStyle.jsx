import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';

import gala from '../../../assets/images/gala_add.svg'
const AuthenticCookingStyle = () => {
    const [authenticRestaurants, setAuthenticRestaurants] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchAuthenticRestaurants = async () => {
            try {
                const data = await RestaurantService.getAllAuthenticCookingStyle();
                setAuthenticRestaurants(data); // Store fetched data in state
            } catch (error) {
                console.error("Error fetching authentic cooking style restaurants:", error);
            }
        };

        fetchAuthenticRestaurants(); // Call the function to fetch data
    }, []);

    return (
        <div className='px-4'>
            <div className='flex flex-row justify-between '>
                <h2 className="text-lg font-semibold mb-4">Authentic Style of Cooking</h2>
                <p className='mr-96'>view All</p>
            </div>
            <div className="flex flex-wrap gap-4 ">
                {authenticRestaurants.map((restaurant) => (
                    <div
                        key={restaurant.restaurant_id}
                        className="w-64 h-58 flex flex-col items-center justify-between border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md"
                    >
                        <div className="w-full h-40 overflow-hidden rounded-t-lg">
                            <img
                                src={restaurant.image} // Assuming restaurant_image contains the image URL
                                alt={restaurant.name}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div className='items-start'>
                        <h6 className="text-lg font-semibold text-left mt-3">{restaurant.name}</h6>
                        <p className='text-xs'>The restaurant has a authentic style of cooking</p>
                        </div>
                    </div>
                ))}

                {/* Empty div to display after the mapped divs */}
                <div className="w-64 h-58 flex flex-col items-center justify-center border border-[#FB6B00] bg-[#FFFFFF] rounded-lg shadow-md">
                    <img src={gala}/>
                    <p className='mt-3'>Add New</p>
                </div>
            </div>
        </div>
    );
}

export default AuthenticCookingStyle;
