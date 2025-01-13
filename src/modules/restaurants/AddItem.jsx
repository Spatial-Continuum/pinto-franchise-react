import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import RestaurantService from './RestaurantService';
import upload from '../../assets/images/upload.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getAllAddonApi, selectGetAllAddonApiData, selectApiError, selectApiLoading } from '../../redux/slices/addons';
import { selectSelectedRestaurant, getRestaurantById, } from '../../redux/slices/restaurant';
const AddItem = ({ restaurantId, setShowAddItem }) => {

    const dispatch = useDispatch();
    const loading = useSelector(selectApiLoading);
    const error = useSelector(selectApiError);
    const addons = useSelector(selectGetAllAddonApiData)
    const selectedRestaurant = useSelector(selectSelectedRestaurant);

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    const [commissionPercentage, setCommissionPercentage] = useState([]);
    const [itemImage, setItemImage] = useState(null)
    const [previewItemImage, setPreviewItemImage] = useState(null)
    const [foodType, setFoodType] = useState(''); // Stores the selected food type
    const [subCategoryTitle, setSubCategoryTitle] = useState('');
    const [formData, setFormData] = useState({
        itemName: '',
        menuCategory: '',
        subCategory: '',
        itemDescription: '',
        basePrice: '',
        prepTime: '',
        quantity: '',
        mealType: '',
        commission: '',
        selectedAddons: [],
        addon: 'false'
    });

    useEffect(() => {
        dispatch(getAllAddonApi(restaurantId))
        if (selectedRestaurant && selectedRestaurant.commission_percentage) {
            setCommissionPercentage(selectedRestaurant.commission_percentage);
        }
        const fetchCategories = async () => {
            try {

                if (restaurantId) {
                    const categoriesData = await RestaurantService.getMenuCategory(restaurantId);
                    setCategories(categoriesData); // Assuming categoriesData is an array

                }
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };
        if (restaurantId) {
            fetchCategories();
        }
    }, [dispatch, restaurantId]);

    const basePrices = formData.basePrice

    const sellingPrice = basePrices + (basePrices * (commissionPercentage / 100));
    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleFoodTypeSelect = (type) => {
        setFoodType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form data on submit:", formData);

        const postData = new FormData(); // Create FormData to handle both text and file uploads
        const basePrice = parseFloat(formData.basePrice, 10);  // Convert base price to integer
        const SellingPrice = parseFloat(sellingPrice, 10);
        const Quantity = parseFloat(formData.quantity, 10);

        // Append text data
        postData.append('item_name', formData.itemName);
        postData.append('item_type', foodType); // Append selected food type ('Veg' or 'Non-Veg')
        postData.append('description', formData.itemDescription);
        postData.append('base_price', basePrice);
        postData.append('preparation_time', formData.prepTime);
        postData.append('quantity', Quantity); // Default quantity (adjust as needed)
        postData.append('is_available', true); // Default availability (adjust if necessary)
        postData.append('selling_price', SellingPrice);
        // postData.append('addons',[]);

        // Append menu category and subcategory IDs
        postData.append('menu_category_id', formData.menuCategory);
        postData.append('subcategory_id', formData.subCategory);
        if (formData.selectedAddons.length > 0) {
            formData.selectedAddons.forEach((addonId) => {
              postData.append('addon_id ', addonId); // Append each addon_id
            });
          }

        // Append item image if present
        if (itemImage) {
            postData.append('image', itemImage);
        } else {
            console.log("No image selected");
        }
        for (let [key, value] of postData.entries()) {
            console.log(`${key}:`, value);
        }

        console.log("posting data id", postData);
        try {
            console.log("forming data is ", postData)
            const response = await RestaurantService.createItemNew(postData); // API call to post the data
            console.log('Item added successfully:', response);
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };


    const handleImageFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemImage(file);
                setPreviewItemImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageData(null)
            setPreviewItemImage(null)
        }
    }
    // const handleIconFileChange = (event) => {
    //     const file = event.target.files[0];
    //     if (file && file.type.startsWith('image/')) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setIconImage({
    //                 file,
    //                 preview: reader.result,
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         setIconImage({ file: null, preview: null })
    //     }
    // }
    const handleSubcategorySearch = async (e) => {

        try {
            setSubCategoryTitle(e)
            const response = await RestaurantService.searchSubcategory(e);
            setSubcategories(response)

        } catch (error) {
            console.error("Error searching subcategories:", error);
        }
    };
    const handleCheckboxChange = (addonId) => {
        setFormData((prev) => {
            const isSelected = prev.selectedAddons.includes(addonId);
            return {
                ...prev,
                selectedAddons: isSelected
                    ? prev.selectedAddons.filter((id) => id !== addonId)
                    : [...prev.selectedAddons, addonId],
            };
        });
    }
    const handleClose = () => {
        setShowAddItem(false);
    };


    return (
        <div>
            <div className="w-full bg-gray-100 p-4 border border-gray-300 rounded-lg">
                <div className="flex justify-between items-center">
                    <p className="text-start text-gray-800 font-medium">+ Add item</p>
                    <div className='flex flex-row gap-2'>
                        <button
                            className="px-5 py-2 bg-white text-black font-medium rounded-md hover:border-grey-700"
                            onClick={handleClose}
                        >
                            cancel
                        </button>
                        <button
                            className="px-5 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-700"
                            onClick={handleSubmit}
                        >
                            Publish
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
                                    name="itemName"
                                    type="text"
                                    placeholder="Enter item name"
                                    value={formData.itemName}
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
                                    name="menuCategory"
                                    value={formData.menuCategory}
                                    onChange={handleChange}
                                    className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select category</option>
                                    {categories.map((category) => (
                                        <option key={category.menu_category_id} value={category.menu_category_id}>
                                            {category.menu_title}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Subcategory Search */}
                            {/* Subcategory Search */}
                            <div className="flex flex-col relative">
                                <label htmlFor="subCategory" className="text-sm font-xs text-gray-700 mb-1">
                                    Subcategory
                                </label>
                                {/* Input field for searching subcategories */}
                                <input
                                    type="text"
                                    id="subCategory"
                                    name="subCategory"
                                    value={subCategoryTitle}
                                    placeholder="Search subcategory"
                                    onChange={(e) => handleSubcategorySearch(e.target.value)}
                                    onBlur={() => setTimeout(() => setSubcategories([]), 200)} // Clear dropdown after input loses focus
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {/* Dropdown list for search results */}
                                {subcategories.length > 0 && (
                                    <ul className="absolute z-10 bg-white mt-2 border border-gray-300 rounded-md max-h-40 overflow-y-auto w-full">
                                        {subcategories.map((sub) => (
                                            <li
                                                key={sub.subcategory_id}
                                                onClick={() => {
                                                    setFormData({ ...formData, subCategory: sub.subcategory_id }); // Set selected subcategory
                                                    setSubCategoryTitle(sub.subcategory_title)
                                                    setSubcategories([]); // Clear dropdown after selection
                                                }}
                                                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                                            >
                                                {sub.subcategory_title}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {/* mealtype */}
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="mealType" className="text-sm font-xs text-gray-700 mb-1">
                                    Meal Type
                                </label>
                                <select
                                    id="mealType"
                                    name="mealType"
                                    value={formData.mealType}
                                    onChange={handleChange}
                                    className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Meal Type</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Breakfast">Breakfast</option>
                                </select>
                            </div>
                        </div>




                        {/* Food Type */}
                        <div>
                            <label className="text-sm font-xs text-gray-700 mb-1">Food Type</label>
                            <div className="flex gap-4 mt-2">
                                <div
                                    className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${foodType === 'Veg' ? 'bg-green-100' : ''}`}
                                    onClick={() => handleFoodTypeSelect('Veg')}
                                >
                                    <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                        <CheckCircleIcon className="h-4 w-4 text-white" />
                                    </div>
                                    <span className="text-sm text-gray-700 font-medium">Veg</span>
                                </div>

                                <div
                                    className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${foodType === 'Non-Veg' ? 'bg-red-100' : ''}`}
                                    onClick={() => handleFoodTypeSelect('Non-Veg')}
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
                            <label htmlFor="itemDescription" className="text-sm font-xs text-gray-700 mb-1">
                                Item Description
                            </label>
                            <textarea
                                id="itemDescription"
                                name="itemDescription"
                                rows="4"
                                placeholder="Enter item description"
                                value={formData.itemDescription}
                                onChange={handleChange}
                                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        {/* Base Price, Commission, and Selling Price */}

                        {/* Base Price and Preparation Time */}
                        <div className="flex items-center space-x-6">

                            <div className="flex flex-col w-1/3">
                                <label htmlFor="basePrice" className="text-sm font-xs text-gray-700 mb-1">
                                    Base Price
                                </label>


                                <input
                                    id="basePrice"
                                    name="basePrice"
                                    type="number"
                                    placeholder="Enter price in num"
                                    value={formData.basePrice}
                                    onChange={handleChange}
                                    className="px-3 py-2 w-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>


                            <div className="flex flex-col w-1/3">
                                <label htmlFor="commission" className="text-sm font-xs text-gray-700 mb-1">
                                    Commission
                                </label>

                                <div
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <span className="text-sm text-gray-700"
                                    >{commissionPercentage}</span>

                                </div>
                            </div>

                            <div className="flex flex-col w-1/3">
                                <label htmlFor="sellingPrice" className="text-sm font-xs text-gray-700 mb-1">
                                    Selling Price
                                </label>
                                <div
                                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    <span className="text-sm text-gray-700">{sellingPrice}</span>
                                </div>
                            </div>
                        </div>


                        {/* Quantity and Preparation Time */}
                        <div className="flex items-center space-x-4">
                            <div className="flex flex-col w-1/2">
                                <label htmlFor="quantity" className="text-sm font-xs text-gray-700 mb-1">
                                    Qty
                                </label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    value={formData.quantity}
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
                                    type="num"
                                    placeholder="Add time in mins"
                                    value={formData.prepTime}
                                    onChange={handleChange}
                                    className="px-3 py-2 w-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Item Image */}
                        <div className='flex flex-row gap-5'>
                            <div className="flex flex-col w-3/6">
                                <label className="text-sm font-xs text-gray-700 mb-1">Item Image</label>
                                <div className="flex  items-center space-x-4 border border-gray-300 rounded-md py-7 px-5 cursor-pointer hover:bg-gray-100">

                                    {previewItemImage ? (
                                        <img
                                            src={previewItemImage}
                                            alt="Item Image"
                                            className="object-cover   rounded-mdd"
                                        />
                                    ) : (
                                        <label htmlFor="upload-item-image" className="flex flex-col items-center cursor-pointer">

                                            <img src={upload} className="h-10 w-10" />
                                            <span className="text-sm font-medium text-[#008BFF]">Choose Image</span>
                                            <span className='text-xs'>Image must be under 5mb*</span>
                                        </label>
                                    )
                                    }
                                    <input
                                        type='file'
                                        id='upload-item-image'
                                        className='hidden'
                                        accept='image/*'
                                        onChange={handleImageFileChange}
                                    />

                                </div>
                                <p className="text-xs text-gray-500 mt-1">Image must be under 5 MB</p>
                            </div>



                            {/* <div className="flex flex-col w-2/6 ">
                                <label className="text-sm font-xs text-gray-700 mb-1">Add Icon</label>
                                <div className="flex h-36 w-full items-center justify-center space-x-4 border border-gray-300 rounded-md py-7 px-5 cursor-pointer hover:bg-gray-100">
                                    {iconImage.preview ? (
                                        <img
                                            src={iconImage.preview}
                                            alt="Icon"
                                            className="object-cover w-full h-full rounded-mdd"
                                        />
                                    ) : (
                                        <label htmlFor="upload-icon-image" className="flex flex-col items-center cursor-pointer">

                                            <img src={upload} className="h-10 w-10" />

                                        </label>
                                    )
                                    }
                                    <input
                                        type='file'
                                        id='upload-icon-image'
                                        className='hidden'
                                        accept='image/*'
                                        onChange={handleIconFileChange}
                                    />

                                </div>

                            </div> */}
                        </div>


                        <div className="flex flex-col">
                            <div className="flex items-center space-x-4">
                                <input
                                    id="addOn"
                                    name="addOn"
                                    type="checkbox"
                                    checked={formData.selectAddOns}
                                    onChange={(e) => setFormData({ ...formData, addon: e.target.checked })}
                                    className="h-4 w-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor="addOn" className="text-sm font-xs text-gray-700">
                                    Add On
                                </label>
                            </div>

                            {formData.addon && (
                                <div className="mt-4">
                                    <label htmlFor="selectAddOns" className="text-sm font-xs text-gray-700 mb-1">
                                        Select Add Ons
                                    </label>
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : error ? (
                                        <p className="text-red-500">{error}</p>
                                    ) : (
                                        <div className="relative">
                                            <div className="border border-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                {addons?.length > 0 ? (
                                                    addons.map((addon) => (
                                                        <div key={addon.addon_id} className="flex items-center space-x-2">
                                                            <input
                                                                type="checkbox"
                                                                id={`addon-${addon.addon_id}`}
                                                                checked={formData.selectedAddons.includes(addon.addon_id)}
                                                                onChange={() => handleCheckboxChange(addon.addon_id)}
                                                                className="h-4 w-4"
                                                            />
                                                            <label
                                                                htmlFor={`addon-${addon.addon_id}`}
                                                                className="text-sm text-gray-700"
                                                            >
                                                                {addon.addon_name}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p className="text-gray-500">No addons available</p>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                            {formData.selectedAddons.length > 0 && (
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {formData.selectedAddons.map((addonId) => {
                                        const addon = addons?.find((a) => a.addon_id === addonId);
                                        return (
                                            <span
                                                key={addonId}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm"
                                            >
                                                {addon?.addon_name}
                                            </span>
                                        );
                                    })}
                                </div>
                            )}

                        </div>

                    </form>
                </div >
            </div >
        </div >
    );
};

export default AddItem;
