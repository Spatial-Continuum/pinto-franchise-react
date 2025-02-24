import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import veg from '../../assets/images/vegicon.svg'
import nonveg from '../../assets/images/nonvegicon.svg'
import RestaurantService from './RestaurantService';
import Upload from '../../assets/images/Upload.svg';
import { getRestaurantById, selectSelectedRestaurant } from '../../redux/slices/restaurant';
import { getAddonById, selectApiError, selectApiLoading, selectGetAddonById, updateAddonApi } from '../../redux/slices/addons';
import { useDispatch, useSelector } from 'react-redux';

const EditAddOn = ({ restaurantId, addonId, setRefresh, setShowEditAddon }) => {
    const [formData, setFormData] = useState({
        addonName: '',
        foodType: '',
        qty: '',
        basePrice: null,
        image: null,
        imagePreview: null,
    });
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const addonById = useSelector(selectGetAddonById)
    const restaurantDetails = useSelector(selectSelectedRestaurant)
    const [commissionPercentage, setCommissionPercentage] = useState(null)

    const sellingPrice = parseInt(formData.basePrice + ((formData.basePrice * commissionPercentage) / 100))




    useEffect(() => {

        if (addonId) { dispatch(getAddonById(addonId)) }
    }, [dispatch, addonId]);

    useEffect(() => {
        if (addonById) {
            setFormData({
                addonName: addonById.addon_name || '',
                foodType: addonById.item_type || '',
                qty: addonById.quantity || '',
                basePrice: addonById.base_price || '',

                image: null || '',
                imagePreview: addonById.image || '',


            });
        }
    }, [addonById]);

    useEffect(() => {
        if (restaurantDetails && restaurantDetails.commission_percentage) {
            setCommissionPercentage(restaurantDetails.commission_percentage);
        }
    }, [restaurantDetails])

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


    const removeImage = () => {
        setFormData(prev => ({
            ...prev,
            image: null,
            imagePreview: ''
        }));
    };


    const handlePublish = async () => {
        let newErrors = {};

        // Validate required fields
        if (!formData.addonName.trim()) newErrors.addonName = "Addon name is required";
        if (!formData.foodType) newErrors.foodType = "Food type is required";
        if (!formData.qty) newErrors.qty = "Quantity is required";
        if (!formData.basePrice || formData.basePrice <= 0) newErrors.basePrice = "Base price must be greater than 0";
        if (!formData.imagePreview) newErrors.image = "Item image is required";

        // If there are any errors, prevent submission and display the errors
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // If no errors, clear the errors state and proceed with form submission
        setErrors({});
        console.log("Form data on publish:", formData);
        const addonData = new FormData()
        addonData.append('addon_name', formData.addonName)
        addonData.append('item_type', formData.foodType)
        // addonData.append('base_price', basePrice)
        // addonData.append('commission', commission)
        addonData.append('restaurant_id',restaurantId)
        addonData.append('base_price', formData.basePrice)
        addonData.append('quantity', formData.qty)
        addonData.append('image', formData?.image)
        addonData.append('selling_price', sellingPrice)
        addonData.append('restaurant', restaurantId)
        for (const [key, value] of addonData.entries()) {
            if (value instanceof File) {
                console.log(`${key}:`);
                console.log(`  File Name: ${value.name}`);
                console.log(`  File Type: ${value.type}`);
                console.log(`  File Size: ${value.size} bytes`);
            } else {
                console.log(`${key}: ${value}`);
            }
        }
        dispatch(updateAddonApi({ addonId, addonData }))


        setRefresh(true)

    }
    return (
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-gray-800">Edit Addon</h1>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={(e) => setShowEditAddon(false)}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                        onClick={handlePublish}
                    >
                        Update
                    </button>
                </div>
            </div>

            {/* Addon Name */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Addon Name</label>
                <input
                    name='addonName'
                    type="text"
                    value={formData.addonName}
                    onChange={(e) => setFormData(prev => ({
                        ...prev,
                        addonName: e.target.value
                    }))}
                    placeholder="Enter addon name"
                   // className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                   className={`w-1/2 border ${errors.addonName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
                   />
                   {errors.addonName && <p className="text-red-500 text-xs mt-1">{errors.addonName}</p>}
            </div>

            {/* Food Type and Qty */}
            <div className="flex gap-4 mb-6">
                {/* Food Type */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                    <div className="flex items-center gap-4">
                        <button
                            // className={`flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700
                            //         ${formData.foodType === 'Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                            // className={`flex items-center px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700`}
                            className={`flex items-center gap-2 px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer ${formData.foodType === 'Veg' ? 'bg-green-100' : ''}`}
                            onClick={(e) => setFormData(prev => ({
                                ...prev,
                                foodType: 'Veg'
                            }))}
                        >
                            <img src={veg} /> &nbsp;Veg
                        </button>
                        <button
                            // className={`flex items-center px-4 py-2 border rounded-md text-gray-700 
                            //     ${formData.foodType === 'Non-Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                            //className={`flex items-center px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700`}
                            className={`flex items-center gap-2 px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer ${formData.foodType === 'Non-Veg' ? 'bg-red-100' : ''}`}
                            onClick={(e) => setFormData(prev => ({
                                ...prev,
                                foodType: 'Non-Veg',
                            }))}
                        >
                            <img src={nonveg} />&nbsp;Non-veg
                        </button>
                    </div>  
                    {errors.foodType && <p className="text-red-500 text-xs mt-1">{errors.foodType}</p>}
                </div>

                {/* Qty */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                    <input
                        type="text"
                        placeholder="Enter quantity in number"
                        value={formData.qty}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            qty: e.target.value
                        }))}
                        //className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                        className={`w-full border ${errors.qty ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
                        />
                        {errors.qty && <p className="text-red-500 text-xs mt-1">{errors.qty}</p>}
                </div>
            </div>

            {/* Pricing */}
            <div className="flex gap-4 mb-6">
                {/* Base Price */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2"> Price</label>
                    <input
                        type="text"
                        value={formData.basePrice}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            basePrice: e.target.value
                        }))}

                        placeholder="Enter base price"
                        //className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                        className={`w-full border ${errors.basePrice ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
                        />
                        {errors.basePrice && <p className="text-red-500 text-xs mt-1">{errors.basePrice}</p>}
                </div>
                {/* Commission */} {/* Selling Price */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission</label>
                    <div
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span className="text-sm text-gray-700"
                        >{commissionPercentage}</span>

                    </div>
                </div>

                <div className="flex-1">
                    <label htmlFor="sellingPrice" className="text-sm font-xs text-gray-700 mb-1">
                        Selling Price
                    </label>
                    <div
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                        <span className="text-sm text-gray-700">{sellingPrice}</span>
                    </div>


                </div>
            </div>

            {/* Item Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                <div className="w-60 h-48 relative bg-gray-100 border ${errors.image ? 'border-red-500' : 'border-gray-300'} rounded-md flex items-center justify-center">
                    {formData.imagePreview ? (
                        <>
                            <img
                                src={formData.imagePreview}
                                alt="Item Preview"
                                className="object-cover w-full h-full rounded-md"
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
                <p className="text-xs text-gray-500 mt-1">Image must be under 5 MB</p>
            </div>
            {errors.image && <p className="text-red-500 text-xs mt-1">{errors.image}</p>}
        </div>
    );
}

export default EditAddOn;
