import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import veg from '../../assets/images/vegicon.svg'
import nonveg from '../../assets/images/nonvegicon.svg'
import { getItemByIdApi, selectGetItemByIdApi, updateItemByIdApi } from '../../redux/slices/item';
import { getSubcategoryByApi, selectSubcategorybyName } from '../../redux/slices/menucategory';
import { getMenuCategoriesByRestaurantApi, selectGetMenuRestaurant } from '../../redux/slices/menucategory';
import { getRestaurantById, selectSelectedRestaurant, selectApiError, selectApiLoading } from '../../redux/slices/restaurant';
import { getAllAddonApi, selectGetAllAddonApiData } from '../../redux/slices/addons';


const EditItem = ({ itemId, restaurantId, setShowEditItem }) => {
  const dispatch = useDispatch();
  //const { itemById } = useSelector((state) => state.item);
  const addons = useSelector(selectGetAllAddonApiData)
  const itemById = useSelector(selectGetItemByIdApi)
  const loading = useSelector(selectApiLoading)
  const error = useSelector(selectApiError)
  const subcategories = useSelector(selectSubcategorybyName)
  const categories = useSelector(selectGetMenuRestaurant)
  const restaurantDetails = useSelector(selectSelectedRestaurant)
  //const [subcategoryTitle, setSubcategoryTitle] = useState('')
  const [searchQuery, setSearchQuery] = useState("")

  //const subcategories = useSelector((state) => state.menuCategory.subcategories);

  const [showSubcategoryDropdown, setShowSubcategoryDropdown] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    foodType: '',
    description: '',
    basePrice: '',
    prepTime: '',
    quantity: '',
    image: null,
    imagePreview: null,
    sellingPrice: '',
    subcategory_id: itemById.subcategory?.subcategory_id || '',
    subcategory_title: itemById.subcategory?.subcategory_title || '',
    selectedAddons: [],
    addons: []
  });

  // Fetch item data on mount
  useEffect(() => {
    if (itemId) {
      dispatch(getItemByIdApi(itemId));

    }
    if (restaurantId) {
      dispatch(getMenuCategoriesByRestaurantApi(restaurantId))
      dispatch(getAllAddonApi(restaurantId))


    }
    console.log('formiing', formData)

  }, [itemId, restaurantId, dispatch]);

  // Populate form when item data is loaded
  useEffect(() => {
    if (itemById) {
      console.log('ietemdjsbf', itemById)
      setFormData({
        name: itemById.item_name || '',
        category: itemById.menu_category?.menu_category_id || '',
        subcategory_id: itemById.subcategory_id || '',
        subcategory_title: itemById.subcategory?.subcategory_title || '',
        foodType: itemById.item_type || '',
        description: itemById.description || '',
        basePrice: itemById.base_price || '',
        quantity: itemById.quantity || '',
        prepTime: itemById.preparation_time || '',
        image: null,
        imagePreview: itemById.image || '',
        sellingPrice: itemById.selling_price || '',
        selectedAddons: Array.isArray(itemById.addons)
          ? itemById.addons.map(addon => addon.addon_id)
          : [],
      });
    }

  }, [itemById,]);

  // Handle subcategory search
  useEffect(() => {
    if (searchQuery.length > 0 && searchQuery !== formData.subcategory_title) {
      dispatch(getSubcategoryByApi(searchQuery));
      setShowSubcategoryDropdown(true);
    }
    else {
      setShowSubcategoryDropdown(false);
    }
    const fetchCategories = async () => {
      try {

        if (restaurantId) {
          dispatch(getMenuCategoriesByRestaurantApi(restaurantId))

        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    if (restaurantId) {
      fetchCategories();
    }
  }, [searchQuery, dispatch]);

  const handleSubcategorySelect = (subcategory) => {
    setFormData((prev) => ({
      ...prev,
      subcategory_id: subcategory.subcategory_id,
      subcategory_title: subcategory.subcategory_title
    }));
    
    setSearchQuery('');
    setShowSubcategoryDropdown(false);
  };

  const handleCheckboxChange = (addonId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedAddons?.includes(addonId);
      return {
        ...prev,
        selectedAddons: isSelected
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
    });
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }));
    }
  };
  const handleRemoveAddon = (addonId) => {
    setFormData({
      ...formData,
      selectedAddons: formData.selectedAddons.filter((id) => id !== addonId),
    });
  }

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: ''
    }));
  };
  const handleFoodTypeSelect = (type) => {
    setFormData(prev => ({
      ...prev,
      foodType: type
    }));
  }
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formPayload = new FormData();
    formPayload.append('item_name', formData.name)
    formPayload.append('menu_category', formData.category)
    formPayload.append('subcategory_id', formData.subcategory_id)
    // formPayload.append('subcategory_title',formData.subcategory_title)  
    formPayload.append('item_type', formData.foodType)
    formPayload.append('description', formData.description)
    formPayload.append('base_price', formData.basePrice)
    formPayload.append('preparation_time', formData.prepTime)
    formPayload.append('quantity', formData.quantity)
    formPayload.append('selling_price', formData.sellingPrice)
    if (formData.image) {
      formPayload.append('image', formData.image)
    }
    if (formData.selectedAddons.length > 0) {
      formData.selectedAddons.forEach((addonId) => {
        formPayload.append('addon_ids', addonId); // 
      });
    }
    for (const [key, value] of formPayload.entries()) {
      if (value instanceof File) {
        console.log(`${key}:`);
        console.log(`  File Name: ${value.name}`);
        console.log(`  File Type: ${value.type}`);
        console.log(`  File Size: ${value.size} bytes`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
  
    console.log('formiing', formData)
    dispatch(updateItemByIdApi({ itemId, formPayload })).unwrap()
    console.log('itemiddata', itemId)
    console.log('formdata', formPayload);
    setShowEditItem(false);
  };

  return (
    <div className="w-full bg-gray-100 p-4 border border-gray-300 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-start text-gray-800 font-medium">Edit Item</p>
        <div className='flex flex-row gap-2'>
          <button
            onClick={() => setShowEditItem(false)}
            className="px-5 py-2 bg-gray-300 text-gray-700 font-medium rounded-md hover:bg-gray-400"
          >
            Cancel
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

      <div className="mb-36">
        <form className="space-y-4">
          {/* Item Name and Menu Category */}
          <div className="flex items-center space-x-4">

            <div className="flex flex-col w-1/2">
              <label htmlFor="itemName" className="text-sm font-xs text-gray-700 mb-1">
                Item Name
              </label>
              <input
                id="itemName"
                name="name"
                type="text"
                placeholder="Enter item name"
                value={formData.name}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col w-1/2">
              <label htmlFor="menuCategory" className="text-sm font-xs text-gray-700 mb-1">
                Menu Category
              </label>
              <select
                id="menuCategory"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="px-3 py-2 border cursor-pointer border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option className="cursor-pointer" value="">Select category</option>
                {categories?.map((category) => (
                  <option key={category.menu_category_id} value={category.menu_category_id}>
                    {category.menu_title}
                  </option>

                ))}
                <option className='text-[#014E8D] cursor-pointer p-3 mt-2' value="addNewMenu">Add a New Menu</option>
              </select>
            </div>
          </div>


          <div className="flex flex-col w-1/2 relative">
            <label htmlFor="subCategory" className="text-sm font-xs text-gray-700 mb-1">Sub Category</label>
            <div className="relative">
              <input
                id="subCategory"
                name='subcategory_title'
                type="text"
                value={formData.subcategory_title || searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) {
                    setFormData(prev => ({
                      ...prev,
                      subcategory_id: '',
                      subcategory_title: ''
                    }))
                  }
                }}
                placeholder="Search"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />

              {showSubcategoryDropdown && (
                <div className="absolute z-10 top-full left-0 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                  {subcategories?.map(sub => (
                    <div
                      key={sub.subcategory_id}
                      onClick={() => handleSubcategorySelect(sub)}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {sub.subcategory_title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div>
            <div>
              <label className="text-sm font-xs text-gray-700 mb-1">Food Type</label>
              <div className="flex gap-4 mt-2">
                <div
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${formData?.foodType === 'Veg' ? 'bg-green-100' : ''}`}
                  onClick={() => handleFoodTypeSelect('Veg')}
                >
                  <div className="w-5 h-5 rounded-full flex items-center justify-center">
                    <img src={veg} className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Veg</span>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${formData.foodType === 'Non-Veg' ? 'bg-red-100' : ''}`}
                  onClick={() => handleFoodTypeSelect('Non-Veg')}
                >
                  <div className="w-5 h-5  flex items-center justify-center">
                    <img src={nonveg} className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-gray-700 font-medium">Non-Veg</span>
                </div>
              </div>
            </div>

            {/* Item Description */}
            <div className="flex flex-col mt-5">
              <label htmlFor="itemDescription" className="text-sm font-xs text-gray-700 mb-1">
                Item Description
              </label>
              <textarea
                id="itemDescription"
                name="description"
                rows="4"
                placeholder="Enter item description"
                value={formData.description}
                onChange={handleChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Base Price and Preparation Time */}
            <div className="flex items-center space-x-6 mt-5">

              <div className="flex flex-col w-1/3">
                <label htmlFor="basePrice" className="text-sm font-xs text-gray-700 mb-1">
                  Base Price
                </label>


                <input
                  id="input-floating"
                  step="0.01"
                  name="basePrice"
                  type="number"
                  placeholder="Enter price in num"
                  value={formData.basePrice}
                  onChange={handleChange}
                  className="px-3 py-2 w-32 border  border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col w-1/3">
                <label htmlFor="commission" className="text-sm font-xs text-gray-700 mb-1">
                  Commission
                </label>

                <div
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-sm text-gray-700"
                  >{restaurantDetails.commission_percentage}</span>

                </div>
              </div>


              <div className="flex flex-col w-1/3">
                <label htmlFor="sellingPrice" className="text-sm font-xs text-gray-700 mb-1">
                  Selling Price
                </label>
                <div
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-sm text-gray-700">{formData.sellingPrice}</span>
                </div>
              </div>

            </div>



            {/* Quantity and Preparation Time */}
            <div className="flex items-center space-x-4 mt-6">
              <div className="flex flex-col w-1/4">
                <label htmlFor="quantity" className="text-sm font-xs text-gray-700 mb-1">
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData?.quantity}
                  placeholder='Enter count'
                  onChange={handleChange}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="prepTime" className="text-sm font-xs text-gray-700 mb-1">
                  Preparation Time
                </label>
                <input
                  id="prepTime"
                  name="prepTime"
                  type="number"
                  placeholder="minutes"
                  value={formData?.prepTime}
                  onChange={handleChange}
                  className="px-3 py-2 w-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>


            <div className='mb-36'>

              {/* Item Name and Category inputs remain same */}

              {/* Modified Subcategory Section */}






              {/* Modified Image Upload Section */}
              <div className="flex flex-col w-2/5 mt-5">
                <label className="text-sm font-xs text-gray-700 mb-1">Item Image</label>
                <div className="relative border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100">
                  {formData.imagePreview ? (
                    <>
                      <img
                        src={formData.imagePreview}
                        alt="Item preview"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <div
                        onClick={removeImage}
                        className="absolute top-1 right-1 p-1 bg-white rounded-full shadow-sm hover:bg-gray-200"
                      >
                        <XMarkIcon className="h-5 w-5 text-gray-600" />
                      </div>
                    </>
                  ) : (
                    <label className="flex flex-col items-center py-7 px-5">
                      <input
                        id="itemImage"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <PhotoIcon className="h-10 w-10 text-gray-400 mr-2" />
                      <span>Choose Image</span>
                      <p className="mt-1 text-xs text-gray-500">Image size must be under 5MB</p>
                    </label>
                  )}
                </div>
              </div>


              <div className="flex flex-col">
                {/* Add-On Checkbox */}
                <div className="flex items-center space-x-4 mt-10">
                  <input
                    id="addOn"
                    name="addOn"
                    type="checkbox"
                    checked={formData.addonChecked}
                    onChange={() => setFormData(prev => ({ ...prev, addonChecked: !prev.addonChecked }))}
                    className="h-4 w-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <label htmlFor="addOn" className="text-sm font-xs text-gray-700">
                    Add On
                  </label>
                </div>

                {/* Dropdown for Addons */}
                {formData.addonChecked && (
                  <div className="relative">
                    {/* Dropdown Button */}
                    <div
                      className="w-4/12 px-3 py-2 mt-4 border cursor-pointer border-gray-400 text-[#9CA3B6] rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onClick={() => setFormData(prev => ({ ...prev, showAddonDropdown: !prev.showAddonDropdown }))}
                    >
                      Select Add Ons 🡣
                    </div>

                    {/* Dropdown List */}
                    {formData.showAddonDropdown && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {loading ? (
                          <p className="p-2">Loading...</p>
                        ) : error ? (
                          <p className="p-2 text-red-500">{error}</p>
                        ) : addons?.length > 0 ? (
                          addons.map((addon) => (
                            <div key={addon.addon_id} className="flex items-center px-3 py-2 hover:bg-gray-100">
                              <input
                                type="checkbox"
                                id={`addon-${addon.addon_id}`}
                                checked={formData.selectedAddons.includes(addon.addon_id)}
                                onChange={() => handleCheckboxChange(addon.addon_id)}
                                className="h-4 w-4"
                              />
                              <label htmlFor={`addon-${addon.addon_id}`} className="ml-2 text-sm text-gray-700">
                                {addon.addon_name}
                              </label>
                            </div>
                          ))
                        ) : (
                          <p className="p-2 text-gray-500">No addons available</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Selected Addons Display */}
                {formData.selectedAddons.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formData.selectedAddons.map((addonId) => {
                      const addon = addons?.find((a) => a.addon_id === addonId);
                      return (
                        <span
                          key={addonId}
                          className="bg-[#c5c8cc88] text-[#000000] border-[1px] border-[#443f3f] px-3 py-1 rounded-xl text-sm"
                        >
                          {addon?.addon_name}
                          <span className="text-xl top-4 items-center cursor-pointer justify-center -mt-0 ml-2"
                            onClick={() => handleRemoveAddon(addonId)}
                          >
                            &times;
                          </span>
                        </span>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div >
  );
};

export default EditItem;