import { Switch } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';

const RestaurantTypeTimings = ({ formData, onDataChange }) => {
    const [data, setData] = useState({
        ...formData,
        opening_hours: formData.opening_hours || {  // Add default object
            Monday: '',
            Tuesday: '',
            Wednesday: '',
            Thursday: '',
            Friday: '',
            Saturday: '',
            Sunday: '',
        },
    })

    useEffect(() => {
        console.log("Form Data Updated: ", data);
        onDataChange(data);
    }, [data]);

    const handleInputChange = (e, day) => {
        const { name, value, type, checked } = e.target;

        // Handle checkboxes and radio buttons
        if (type === "checkbox") {
            setData((prev) => {
                const updatedValues = prev[name] || [];
                if (checked) {
                    return { ...prev, [name]: [...updatedValues, value] };
                } else {
                    return { ...prev, [name]: updatedValues.filter((item) => item !== value) };
                }
            });
        }
        // Handle radio buttons
        else if (type === "radio") {
            setData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        // Handle time inputs for each day
        else if (name === "start_time" || name === "end_time") {
            setData((prev) => ({
                ...prev,
                [day]: {
                    ...prev[day],
                    [name]: value, // Update the specific day with the new time value
                },
            }));
        } else {
            setData((prev) => ({
                ...prev,
                [name]: value, // Generic case for other inputs (e.g., text or textarea)
            }));
        }
    };

    // Handle changes for opening hours
    const handleOpeningHoursChange = (day, value) => {
        setData((prev) => ({
            ...prev,
            opening_hours: {
                ...prev.opening_hours,
                [day]: value, // Update the opening hours for the specific day
            },
        }));
    };

    return (
        <div className="p-6 space-y-8 bg-gray-100 rounded-lg border border-gray-300">
            {/* Restaurant Category */}
            <div>
                <h2 className="font-medium text-gray-800 mb-4">Restaurant Category</h2>
                <div className="w-4/6 bg-white items-start p-6 rounded-lg border border-gray-300">
                    <div className="flex  gap-32 ">
                        <label className="flex  space-x-2">
                            <input
                                type="radio"
                                name="restaurant_category"
                                checked={formData.restaurant_category === 'Both'}
                                onChange={handleInputChange}
                                value="Both"
                            />
                            <span className="text-gray-700">Dining & Delivery</span>
                        </label>
                        <label className="flex  space-x-2">
                            <input
                                type="radio"
                                name="restaurant_category"
                                checked={formData.restaurant_category === 'Delivery'}
                                onChange={handleInputChange}
                                value="Delivery"
                            />
                            <span className="text-gray-700">Delivery Only</span>
                        </label>
                        <label className="flex space-x-2">
                            <input
                                type="radio"
                                name="restaurant_category"
                                checked={formData.restaurant_category === 'Dine-in'}
                                onChange={handleInputChange}
                                value="Dine-in"
                            />
                            <span className="text-gray-700">Dining Only</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Store Selection */}
            <div>
                <h2 className="font-medium text-gray-800 mb-4">Select the best for your store</h2>
                <div className="w-4/6 bg-white p-4 rounded-lg border border-gray-300 grid grid-cols-5 gap-4">
                    {['Bakery', 'Casual Dining', 'Dhaba', 'Fast Food', 'Hotel', 'Restaurant', 'Military Hotel'].map((store, index) => (
                        <label key={index} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="merchant_type"
                                checked={formData.merchant_type?.includes(store) || false}  // Default to false if undefined
                                onChange={handleInputChange}
                                value={store}
                            />
                            <span className="text-gray-700">{store}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Short Description */}
            <div>
                <h2 className="font-medium text-gray-800 mb-4">Write a short description about your restaurant</h2>
                <textarea
                    className="w-4/6 h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description here..."
                    name="short_description"
                    value={formData.short_description || ''}  // Default to empty string if undefined
                    onChange={handleInputChange}
                />
            </div>

            {/* Types of Cuisines */}
            <div>
                <h2 className="font-medium text-gray-800 mb-4">Types of Cuisines</h2>
                <div className="w-4/6 bg-white p-4 rounded-lg border border-gray-300 grid grid-cols-5 gap-4">
                    {["Italian", "North Indian", "South Indian", "Tibetan", "Japanese", "Chinese", "Korean"].map((cuisine, index) => (
                        <label key={index} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="cuisine_type"
                                checked={formData.cuisine_type?.includes(cuisine) || false}  // Default to false if undefined
                                onChange={handleInputChange}
                                value={cuisine}
                            />
                            <span className="text-gray-700">{cuisine}</span>
                        </label>
                    ))}
                </div>
            </div>

            {formData.opening_hours && Object.keys(formData.opening_hours).length > 0 ? (
                <div>
                    <h2 className="font-medium text-gray-800 mb-4">Restaurant Operating Hours</h2>
                    <div className="w-8/12 bg-white p-4 rounded-lg border border-gray-300">
                        <table className="w-full text-gray-700">
                            {/* Table Header */}
                            <thead>
                                <tr>
                                    <th className="text-left py-2">Day</th>
                                    <th className="text-left py-2">Open/Closed</th>
                                    <th className="text-left py-2">Start Time - End Time</th>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {Object.keys(formData.opening_hours).map((day) => (
                                    <tr key={day} className="hover:bg-gray-100">
                                        <td className="py-2">{day}</td>
                                        <td className="py-2">
                                            <Switch
                                                checked={formData.opening_hours[day] !== ''}
                                                onChange={(checked) => {
                                                    // When the switch is toggled, either set the value to empty or set a default time
                                                    setData((prev) => ({
                                                        ...prev,
                                                        opening_hours: {
                                                            ...prev.opening_hours,
                                                            [day]: checked ? '9:00 AM - 5:00 PM' : '', // Default time or empty
                                                        },
                                                    }));
                                                }}
                                            />
                                        </td>
                                        <td className="py-2">
                                            <input
                                                type="text"
                                                placeholder="e.g., 9:00 AM - 5:00 PM or Closed"
                                                value={formData.opening_hours[day] || ''}
                                                onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                                                disabled={formData.opening_hours[day] === ''}  // Disable if no opening hours
                                                className="border border-gray-300 rounded-md px-2 py-1 "
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No opening hours data available.</p>
            )}


        </div>
    );
};

export default RestaurantTypeTimings;
