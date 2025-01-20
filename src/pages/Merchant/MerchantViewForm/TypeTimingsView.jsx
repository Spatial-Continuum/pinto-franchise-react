import { Switch } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';

const TypeTimingsView = ({ restaurantInfo, ExtraCuisine, ExtraStore, onDataChange }) => {
   

    // const [customStore, setCustomStore] = useState('');
    // const [customCuisine, setCustomCuisine] = useState('');

    // useEffect(() => {
    //     if (formData) {
    //       setData({
    //         restaurant_category: formData.restaurant_category || '',
    //         merchant_type: formData.merchant_type || [],
    //         cuisine_type: formData.cuisine_type || [],
    //         opening_hours: formData.opening_hours || '',
    //         customStore: ExtraStore || '',
    //         customCuisine: ExtraCuisine || '',
    //       });
    //     }
    //   }, [formData, ExtraCuisine, ExtraStore]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setData((prev) => ({
            ...prev, [name] :value}))
        onDataChange({...data, [name]: value})
        }
            

                
    const handleCustomInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'custom_store') {
            setCustomStore(value);
        } else if (name === 'custom_cuisine') {
            setCustomCuisine(value);
        }
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
                                checked={restaurantInfo?.restaurant_category === 'Both'}
                                onChange={handleInputChange}
                                value="Both"
                            />
                            <span className="text-gray-700">Dining & Delivery</span>
                        </label>
                        <label className="flex  space-x-2">
                            <input
                                type="radio"
                                name="restaurant_category"
                                checked={restaurantInfo?.restaurant_category === 'Delivery'}
                                onChange={handleInputChange}
                                value="Delivery"
                            />
                            <span className="text-gray-700">Delivery Only</span>
                        </label>
                        <label className="flex space-x-2">
                            <input
                                type="radio"
                                name="restaurant_category"
                                checked={restaurantInfo?.restaurant_category === 'Dine-in'}
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
                                checked={restaurantInfo.merchant_type?.includes(store) || false}  // Default to false if undefined
                                onChange={handleInputChange}
                                value={store}
                            />
                            <span className="text-gray-700">{store}</span>
                        </label>
                    ))}

                    {/* 'Others' checkbox */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name='merchant_type'
                            checked={restaurantInfo.merchant_type?.includes('Others') || false}
                            onChange={handleInputChange}
                            value="Others"
                        />
                        <span className="text-gray-700">Others</span>
                    </label>

                    {/* Input for 'Others' */}
                    {restaurantInfo.merchant_type?.includes('Others') && (
                        <div className="w-full mt-4 border-b border-teal-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Custom Store Type"
                                name="custom_store"
                                value={restaurantInfo.customStore || ''}
                                onChange={handleCustomInputChange}
                                aria-label="Custom Store Type"
                            />
                        </div>
                    )}

                </div>
            </div>

            {/* Short Description */}
            <div>
                <h2 className="font-medium text-gray-800 mb-4">Write a short description about your restaurant</h2>
                <textarea
                    className="w-4/6 h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter description here..."
                    name="short_description"
                    value={restaurantInfo.short_description || ''}  // Default to empty string if undefined
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
                                checked={restaurantInfo.cuisine_type?.includes(cuisine) || false}  // Default to false if undefined
                                onChange={handleInputChange}
                                value={cuisine}
                            />
                            <span className="text-gray-700">{cuisine}</span>
                        </label>
                    ))}

                    {/* 'Others' checkbox */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="cuisine_type"
                            checked={restaurantInfo.cuisine_type?.includes('Others') || false}
                            onChange={handleInputChange}
                            value="Others"
                        />
                        <span className="text-gray-700">Others</span>
                    </label>

                    {/* Input for 'Others' */}
                    {restaurantInfo.cuisine_type?.includes('Others') && (
                        <div className="w-full mt-4 border-b border-teal-500 py-2">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter Custom Store Type"
                                name="custom_cuisine"
                                value={restaurantInfo.customCuisine || ''}
                                onChange={handleCustomInputChange}
                                aria-label="Custom Cuisine Type"
                            />
                        </div>
                    )}

                </div>
            </div>

            {restaurantInfo.opening_hours && Object.keys(restaurantInfo.opening_hours).length > 0 ? (
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
                                {Object.keys(restaurantInfo.opening_hours).map((day) => (
                                    <tr key={day} className="hover:bg-gray-100">
                                        <td className="py-2">{day}</td>
                                        <td className="py-2">
                                            <Switch
                                                checked={restaurantInfo.opening_hours[day] !== ''}
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
                                                value={restaurantInfo.opening_hours[day] || ''}
                                                onChange={(e) => handleOpeningHoursChange(day, e.target.value)}
                                                disabled={restaurantInfo.opening_hours[day] === ''}  
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

export default TypeTimingsView;
