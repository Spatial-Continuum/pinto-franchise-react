import React, { useEffect, useState } from 'react';
import RestaurantService from '../../restaurants/RestaurantService';
import gala from '../../../assets/images/gala_add.svg';
import { useNavigate } from 'react-router-dom';

const AuthenticCookingStyle = () => {
    const [authenticRestaurants, setAuthenticRestaurants] = useState([]);
    const navigate = useNavigate();

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
        <div className="pl-4">
            <div className="flex flex-row justify-between">
                <h2 className="text-2xl font-semibold mb-4">Authentic Style of Cooking</h2>
                <button
                    onClick={() => navigate('/homescreen/authenticstyle')}
                    className="mr-16 text-lg font-normal text-[#FB6B00]"
                >
                    View All
                </button>
            </div>
            <div className="flex flex-wrap gap-4">
                {/* Map over the first 3 restaurants */}
                {authenticRestaurants.slice(0, 3).map((restaurant) => (
                    <div
                        key={restaurant.restaurant_id}
                        className="w-96 h-64 flex flex-col border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md"
                    >
                        <div className="w-full h-40 overflow-hidden rounded-t-lg">
                            <img
                                src={restaurant.image} // Assuming restaurant.image contains the image URL
                                alt={restaurant.name}
                                className="object-fit w-full h-full"
                            />
                        </div>
                        <div className="p-3">
                            <h6 className="text-lg font-semibold">{restaurant.name}</h6>
                            <p className="text-xs">
                                The restaurant has an authentic style of cooking
                            </p>
                        </div>
                    </div>
                ))}

                {/* Empty div to display after the mapped divs */}
                <div className="w-96 h-64 flex flex-col items-center justify-center border border-[#FB6B00] bg-[#FFFFFF] rounded-lg shadow-md">
                    <img src={gala} alt="Add New" />
                    <p className="mt-3">Add New</p>
                </div>
            </div>
        </div>
    );
};

export default AuthenticCookingStyle;
