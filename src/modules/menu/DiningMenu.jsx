import React from 'react'
import CategoryData from './CategoryData';
import { useState } from 'react';

const DiningMenu = () => {

    
        const [selectedCategory, setSelectedCategory] = useState(null); // Track selected category
      
        const handleCategoryClick = (category) => {
          if (selectedCategory === category) {
            setSelectedCategory(null); // Toggle the selected category
          } else {
            setSelectedCategory(category);
          }
        
    }
    return (
        <div>
            <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
                {/* Left side: Dining and Charges */}
                <div className="flex items-center space-x-4">
                    <h1 className="text-lg font-bold text-gray-800">Dining</h1>
                    <h1 className="text-lg font-bold text-gray-800">Charges</h1>
                </div>

                {/* Right side: +Add Item Button */}
                <button className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-blue-600">
                    + Add Item
                </button>
            </div>

            <div className="flex gap-5 p-4">

                <div className="w-3/5 bg-gray-100 p-4 border border-gray-300 rounded-lg">

                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-lg font-bold text-gray-800">Menu</h1>
                        <button className="px-4 py-2 text-orange-500 font-medium rounded-md ">
                            + Add Category
                        </button>
                    </div>

                    <div className='bg-slate-200 py-2 -mx-4'>
                        <h2 className="text-gray-400 px-4 text-md font-semibold">
                            12 Categories
                        </h2>
                    </div>
                    {/* _________________________________________________ */}
                    <div className="p-6">
                        {/* Category Navbar */}
                        <div className="flex  flex-col mb-4 gap-2">
                            {CategoryData.map((category, index) => (
                                <button
                                    key={index}
                                    className="text-lg text-start font-semibold px-4 py-2  text-black rounded-md "
                                    onClick={() => handleCategoryClick(category.category)}
                                >
                                    {category.category}
                                </button>
                            ))}
                        </div>

                        {/* Display items based on selected category */}
                        {selectedCategory && (
                            <div>
                                <ul className="list-disc pl-5">
                                    {CategoryData
                                        .find((category) => category.category === selectedCategory)
                                        .items.map((item, index) => (
                                            <ul key={index} className="mb-2">
                                                <strong>{item.name}</strong> - ₹{item.price}
                                            </ul>
                                        ))}
                                </ul>
                            </div>
                        )}
                    </div>



                </div>


                <div className="w-2/5 bg-gray-100 p-4 border border-gray-300 rounded-lg">
                    <p className="text-start text-gray-800 font-medium">+ Add item</p>
                </div>
            </div>

        </div>
    )
}

export default DiningMenu
