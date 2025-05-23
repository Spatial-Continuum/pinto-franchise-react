import React, { useEffect, useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import veg from '../../assets/images/vegicon.svg'
import nonveg from '../../assets/images/nonvegicon.svg'
import RestaurantService from './RestaurantService';
import Upload from '../../assets/images/Upload.svg';
import { getRestaurantById, selectSelectedRestaurant } from '../../redux/slices/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { createAddonAPi, getAllAddonApi } from '../../redux/slices/addons';
const AddAddOn = ({ restaurantId,setRefresh, setShowAddAddon }) => {
    console.log('ifhhi', restaurantId)
    const [addonName, setAddonName] = useState('')
    const [foodType, setFoodType] = useState('')
    const [qty, setQty] = useState('')
    const [basePrice, setBasePrice] = useState(null);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});

    const restaurantDetails = useSelector(selectSelectedRestaurant)

    const [commissionPercentage, setCommissionPercentage] = useState(null);
    // const [sellingPrice, setSellingPrice] = useState('');
    const [itemImage, setItemImage] = useState({
        file: null,
        preview: null,
    });

    const handleImageFileChange = (event) => {
        const file = event.target.files[0];

        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setItemImage({
                    file,
                    preview: reader.result,
                });
            };
            reader.readAsDataURL(file);
        } else {
            setImageData({ file: null, preview: null })
        }

    }
    // useEffect(() => {
    //     dispatch(getRestaurantById(restaurantId))
    // }, [dispatch, restaurantId])

    useEffect(() => {
        if (restaurantDetails && restaurantDetails.commission_percentage) {
            setCommissionPercentage(restaurantDetails.commission_percentage);
        }
    }, [restaurantDetails])


    let sellingPrice = parseInt(basePrice + ((basePrice * commissionPercentage) / 100))


    const handlePublish = async () => {
        let newErrors = {};

        // Validate required fields
        if (!addonName.trim()) newErrors.addonName = "Addon name is required";
        if (!foodType) newErrors.foodType = "Food type is required";
        if (!qty) newErrors.qty = "Quantity is required";
        if (!basePrice || basePrice <= 0) newErrors.basePrice = "Base price is required and must be greater than 0";
        if (!itemImage.preview) newErrors.itemImage = "Please upload an image";
    
        // If there are errors, prevent submission
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
    
        // If no errors, proceed with submission
        setErrors({}); // Clear errors
        console.log("Form data on publish:", { addonName, foodType, qty, basePrice, itemImage,sellingPrice,restaurantId });
    
        const addonData = new FormData()
        addonData.append('addon_name', addonName)
        addonData.append('item_type', foodType)
        // addonData.append('base_price', basePrice)
        // addonData.append('commission', commission)
        addonData.append('base_price', basePrice)
        addonData.append('quantity', qty)
        addonData.append('image', itemImage.file)
        // addonData.append('restaurant_id',restaurantId)
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
            }}
            console.log("Form data on publish111:", { addonName, foodType, qty, basePrice, itemImage,sellingPrice,restaurantId });

        dispatch(createAddonAPi(addonData)).unwrap()
            .then((response) => {
                console.log('Addon created successfully:', response);
                // Handle success (e.g., show a success message, reset form, etc.)
                dispatch(getAllAddonApi(restaurantId))
            })
            .catch((error) => {
                console.error('Error creating addon:', error);
                // Handle error (e.g., show an error message)
            });
        // Reset form fields
        setAddonName('');
        setFoodType('');
        setQty('');
        setBasePrice('');
        setItemImage({ file: null, preview: null });
        setCommissionPercentage(null);  
       
        setShowAddAddon(false);
        setRefresh(true)
        

    }

    return (
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-gray-800">New Addon</h1>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100"
                        onClick={() => setShowAddAddon(false)}>
                        Cancel
                    </button>
                    <button className="px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </div>

            {/* Addon Name */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Addon Name</label>
                <input
                    type="text"
                    value={addonName}
                    onChange={(e) => setAddonName(e.target.value)}
                    placeholder="Enter addon name"
                    //className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    className={`w-1/2 border ${errors.addonName ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
                    />
                    {errors.addonName && <p className="text-red-500 text-xs mt-1">{errors.addonName}</p>}
            </div>

            {/* Food Type and Qty */}
            <div className="flex w-full justify-between gap-4 mb-6">
                {/* Food Type */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                    <div className="flex flex-row gap-4">
                        <button
                            // className={`flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700
                            //      ${foodType === 'Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                            //className={`flex items-center px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700`}
                            className={`flex items-center gap-2 px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer ${foodType === 'Veg' ? 'bg-green-100' : ''}`}
                            onClick={() => setFoodType('Veg')}
                        >
                            <img src={veg} /> &nbsp;Veg
                        </button>
                        <button
                            // className={`flex items-center px-4 py-2 border rounded-md border-gray-300 text-gray-700 
                            // ${foodType === 'Non-Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                           // className={`flex items-center px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md text-gray-700`}
                           className={`flex items-center gap-2 px-4 py-2 border ${errors.foodType ? 'border-red-500' : 'border-gray-300'} rounded-md cursor-pointer ${foodType === 'Non-Veg' ? 'bg-red-100' : ''}`}
                            onClick={() => setFoodType('Non-Veg')}
                        >
                            <img src={nonveg} />&nbsp;Non-veg
                        </button>
                    </div>
                    {errors.foodType && <p className="text-red-500 text-xs mt-1">{errors.foodType}</p>}
                </div>
                
                {/* Qty */}
                <div className="flex flex-col">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                    <input
                        type="text"
                        placeholder="Enter quantity in number"
                        value={qty}
                        onChange={(e) => { setQty(e.target.value) }}
                       // className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                       className={`w-20 border ${errors.qty ? 'border-red-500' : 'border-gray-300'} rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500`}
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
                        value={basePrice}
                        onChange={(e) => setBasePrice(e.target.value)}

                        placeholder="Enter base price"
                       // className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
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
                <div className={`w-60 h-48 bg-gray-100 border ${errors.itemImage ? 'border-red-500' : 'border-gray-300'} rounded-md flex items-center justify-center`}>
                    {itemImage.preview ? (
                        <img
                            src={itemImage.preview}
                            alt="Item Preview"
                            className="object-cover w-full h-full rounded-md"
                        />
                    ) : (
                        <label htmlFor="upload-item-image" className="flex flex-col items-center cursor-pointer">
                            <img src={Upload} alt="Upload" className="w-10 h-10 mb-2" />
                            <span className="text-sm font-medium text-[#008BFF]">Choose Image</span>
                        </label>
                    )}
                    <input
                        type="file"
                        id="upload-item-image"
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageFileChange}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">Image must be under 5 MB</p>
            </div>
            {errors.itemImage && <p className="text-red-500 text-xs mt-1">{errors.itemImage}</p>}
        </div>
    );
};

export default AddAddOn;
