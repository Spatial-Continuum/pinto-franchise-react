import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import RestaurantService from './RestaurantService'; // Adjust the import path accordingly

const EditItem = ({ item ,setShowEditItem }) => {
  // Set the initial state for form fields based on itemData
  // const [itemName, setItemName] = useState(itemData.name || '');
  // const [menuCategory, setMenuCategory] = useState(itemData.category || '');
  // const [subCategory, setSubCategory] = useState(itemData.subCategory || '');
  // const [foodType, setFoodType] = useState(itemData.foodType || '');
  // const [itemDescription, setItemDescription] = useState(itemData.description || '');
  // const [basePrice, setBasePrice] = useState(itemData.basePrice || '');
  // const [prepTime, setPrepTime] = useState(itemData.prepTime || '');
  // const [itemImage, setItemImage] = useState(itemData.image || '');

  useEffect(() => {
    // Handle any side effects or fetching data if needed
  }, [item]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedItemData = {
      name: itemName,
      category: menuCategory,
      subCategory: subCategory,
      foodType: foodType,
      description: itemDescription,
      basePrice: basePrice,
      prepTime: prepTime,
      image: itemImage
    };

    try {
      const response = await RestaurantService.editItem(itemData.id, updatedItemData);
      console.log("Item updated successfully:", response);
      // You can add success message or redirection logic here
    } catch (error) {
      console.error("Error updating item:", error);
      // Handle error case (e.g., show an error message)
    }
  };

  return (
    <div>
      <div className="w-full bg-gray-100 p-4 border border-gray-300 rounded-lg">
        <div className="flex justify-between items-center">
          <p className="text-start text-gray-800 font-medium">Edit Item</p>
          <div className='flex flex-row gap-2'>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Update
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Update
          </button>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />
        <div className='mb-36'>
          <form className="space-y-4">
            {/* First Row: Item Name and Menu Category */}
            <div className="flex items-center space-x-4">
              {/* Item Name */}
              <div className="flex flex-col w-1/2">
                <label htmlFor="itemName" className="text-sm font-xs text-gray-700 mb-1">Item Name</label>
                <input
                  id="itemName"
                  type="text"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Menu Category */}
              <div className="flex flex-col w-1/2">
                <label htmlFor="menuCategory" className="text-sm font-xs text-gray-700 mb-1">Menu Category</label>
                <select
                  id="menuCategory"
                  value={menuCategory}
                  onChange={(e) => setMenuCategory(e.target.value)}
                  className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select category</option>
                  <option value="Pizza">Pizza</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>
            </div>

            {/* Sub Category */}
            <div className="flex flex-col w-1/2">
              <label htmlFor="subCategory" className="text-sm font-xs text-gray-700 mb-1">Sub Category</label>
              <div className="relative">
                <input
                  id="subCategory"
                  type="text"
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  placeholder="Search"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                />
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Food Type */}
            <div>
              <label className="text-sm font-xs text-gray-700 mb-1">Food Type</label>
              <div className="flex gap-4 mt-2">
                <div
                  onClick={() => setFoodType('Veg')}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-green-100 ${foodType === 'Veg' ? 'bg-green-100' : ''}`}
                >
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircleIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Veg</span>
                </div>

                <div
                  onClick={() => setFoodType('Non-Veg')}
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-red-100 ${foodType === 'Non-Veg' ? 'bg-red-100' : ''}`}
                >
                  <div className="w-5 h-5 bg-red-500 flex items-center justify-center">
                    <ChevronRightIcon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Non-Veg</span>
                </div>
              </div>
            </div>

            {/* Item Description */}
            <div className="flex flex-col">
              <label htmlFor="itemDescription" className="text-sm font-xs text-gray-700 mb-1">Item Description</label>
              <textarea
                id="itemDescription"
                rows="4"
                value={itemDescription}
                onChange={(e) => setItemDescription(e.target.value)}
                placeholder="Enter item description"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Base Price and Preparation Time */}
            <div className="flex items-center space-x-6">
              <div className="flex flex-col">
                <label htmlFor="basePrice" className="text-sm font-xs text-gray-700 mb-1">Base Price</label>
                <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                  <span className="text-sm text-gray-700">Rs.</span>
                  <input
                    id="basePrice"
                    type="number"
                    value={basePrice}
                    onChange={(e) => setBasePrice(e.target.value)}
                    className="ml-2 w-14 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="prepTime" className="text-sm font-xs text-gray-700 mb-1">Preparation Time</label>
                <input
                  id="prepTime"
                  type="text"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  placeholder="Add time"
                  className="px-3 py-2 w-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Item Image */}
            <div className="flex flex-col w-2/5">
              <label className="text-sm font-xs text-gray-700 mb-1">Item Image</label>
              <div className="flex items-center space-x-4 border border-gray-300 rounded-md py-7 px-5 cursor-pointer hover:bg-gray-100">
                <input
                  id="itemImage"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => setItemImage(e.target.files[0])}
                />
                <div className="flex flex-col items-center text-sm text-gray-700">
                  <PhotoIcon className="h-10 w-10 text-gray-400 mr-2" />
                  <span>Choose Image</span>
                  <p className="mt-1 text-xs text-gray-500">Image size must be under 5MB</p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItem;
