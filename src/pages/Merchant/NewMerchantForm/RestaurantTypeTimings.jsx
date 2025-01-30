import { Switch } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';

const RestaurantTypeTimings = ({ formData, ExtraCuisine, ExtraStore, onDataChange }) => {
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

    const [customStore, setCustomStore] = useState('');
    const [customCuisine, setCustomCuisine] = useState('');

    useEffect(() => {
        console.log("Form Data Updated: ", data);
        onDataChange({
            ...data, customStore, customCuisine
        });

    }, [data, customStore, customCuisine]);

    const handleInputChange = (e, day) => {
        const { name, value, type, checked } = e.target;

        setData((prev) => {
            if (type === 'checkbox') {
                if (value === 'Others') {
                    if (name === 'merchant_type') {
                        return {
                            ...prev,
                            otherStore: checked ? value : '{customStore}',
                            // merchant_type: checked ? [] : prev.merchant_type,
                        };
                    } else if (name === 'cuisine_type') {
                        return {
                            ...prev,
                            otherCuisine: checked ? value : '{customCuisine}',
                            // cuisine_type: checked ? [] : prev.cuisine_type,
                        };
                    }
                }

                const updatedValues = prev[name] || [];
                if (checked) {
                    return { ...prev, [name]: [...updatedValues, value] };
                } else {
                    return { ...prev, [name]: updatedValues.filter((item) => item !== value) };
                }
            }
            // Handle other input types
            else if (type === "radio") {
                return { ...prev, [name]: value };
            } else if (name === "start_time" || name === "end_time") {
                return {
                    ...prev,
                    [day]: {
                        ...prev[day],
                        [name]: value,
                    },
                };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };

    const handleCustomInputChange = (e) => {
        const { name, value } = e.target;

        if (name === 'custom_store') {
            setCustomStore(value);
        } else if (name === 'custom_cuisine') {
            setCustomCuisine(value);
        }
    };

    const handleOpeningHoursChange = (day, value) => {
        setData((prev) => ({ ...prev, opening_hours: { ...prev.opening_hours, [day]: value } }));
        onDataChange({ ...data, opening_hours: { ...data.opening_hours, [day]: value, } })
    };

    return (
        <div className="p-6 space-y-8 bg-[#FFFFFF] rounded-lg ">
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

                    {/* 'Others' checkbox */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name='merchant_type'
                            checked={formData.otherStore === 'Others'} // Check if 'Others' is selected
                            onChange={handleInputChange}
                            value="Others"
                        />
                        <span className="text-gray-700"></span>


                        {/* Input for 'Others' */}
                        {/* {formData.otherStore === "Others" && ( */}
                        <div className="w-full  border-b border-teal-500 ">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter custom Store Type"
                                name="custom_store"
                                value={customStore}
                                onChange={handleCustomInputChange}
                                aria-label="Custom Store Type"
                            />
                        </div>

                    </label>

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
                <p className='text-[12px] text-[#667085] ml-2 -mt-2'>should not exceed 20 words</p>
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

                    {/* 'Others' checkbox */}
                    <label className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            name="cuisine_type"
                            checked={formData.otherCuisine === 'Others'} // Check if 'Others' is selected
                            onChange={handleInputChange}
                            value="Others"
                        />
                        <span className="text-gray-700"></span>


                        {/* Input for 'Others' */}
                        {/* {formData.otherCuisine === "Others" && ( */}
                        <div className="w-full  border-b border-teal-500 ">
                            <input
                                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
                                type="text"
                                placeholder="Enter custom cuisine"
                                name="custom_cuisine"
                                value={customCuisine}
                                onChange={handleCustomInputChange}
                                aria-label="Custom Cuisine Type"
                            />
                        </div>

                    </label>

                </div>
            </div>

            {formData.opening_hours && Object.keys(formData.opening_hours).length > 0 ? (
                <div>
                    <h2 className="font-medium text-gray-800 mb-4">Restaurant Operating Hours</h2>
                    <div className="w-8/12 bg-white p-4 rounded-lg border border-gray-300">
                        <table className="w-full text-gray-700">
                            {/* Table Header */}
                            <thead>
                                <tr className='grid grid-cols-3 gap-36'>
                                    <div>
                                    <th className="text-left py-2">Day</th>
                                    </div>
                                    <div className=''>
                                    <th className="text-center  py-2 ">Open/Closed</th>
                                    </div>
                                    <div className='flex gap-16  '>
                                    <th className="text-left py-2">Start Time</th>
                                    <th className="text-left py-2">End Time</th>
                                    </div>
                                </tr>
                            </thead>

                            {/* Table Body */}
                            <tbody>
                                {Object.keys(formData.opening_hours).map((day) => (
                                    <tr key={day} className="hover:bg-gray-100 grid grid-cols-3 gap-36">
                                        <div className=''>
                                        <td className="py-2">{day}</td>
                                        </div>
                                     <div className=''>
                                        <td className="py-2 flex flex-row gap-3 ">
                                            <Switch
                                                checked={formData.opening_hours[day] !== ''}
                                                onChange={(checked) => {
                                                    // When the switch is toggled, either set the value to empty or set a default time
                                                    setData((prev) => ({
                                                        ...prev,
                                                        opening_hours: {
                                                            ...prev.opening_hours,
                                                            [day]: checked ? '09:00 - 17:00' : '', // Default time or empty
                                                        },
                                                    }));
                                                }}
                                            />
                                            <p>{formData.opening_hours[day] !== '' ? "Opened" : "Closed"}
                                            </p>
                                        </td>
                                        </div>
                                       
                                        <div className='flex gap-4 '>
                                        <td className="py-2">
                                            <input
                                                type="time"
                                                id={`start-time-${day}`}
                                                className="bg-[#FFFFFF] border leading-none border-[#A6A6A6] text-[#636363] text-sm rounded-lg  p-2.5 px-5 "
                                                value={formData.opening_hours[day].split(' - ')[0] || '09:00'} // Extract start time or set default
                                                onChange={(e) => handleOpeningHoursChange(day, `${e.target.value} - ${formData.opening_hours[day].split(' - ')[1] || '17:00'}`)}
                                                disabled={formData.opening_hours[day] === ''}
                                            />
                                        </td>
                                        <td className="py-2">
                                            <input
                                                type="time"
                                                id={`end-time-${day}`}
                                                className="bg-[#FFFFFF] border leading-none border-[#A6A6A6] text-[#636363] text-sm rounded-lg p-2.5 px-5"
                                                value={formData.opening_hours[day].split(' - ')[1] || '17:00'} // Extract end time or set default
                                                onChange={(e) => handleOpeningHoursChange(day, `${formData.opening_hours[day].split(' - ')[0] || '09:00'} - ${e.target.value}`)}
                                                disabled={formData.opening_hours[day] === ''}
                                            />
                                        </td>
                                        </div>
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
