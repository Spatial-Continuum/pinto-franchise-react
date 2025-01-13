import React, { useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, ChevronRightIcon, PhotoIcon } from '@heroicons/react/24/outline';
import RestaurantService from './RestaurantService';
import Upload from '../../assets/images/Upload.svg';

const AddAddOn = ({ restaurantId }) => {
    console.log('ifhhi', restaurantId)
    const [addonName, setAddonName] = useState('')
    const [foodType, setFoodType] = useState('')
    const [qty, setQty] = useState('')
    const [basePrice, setBasePrice] = useState('');
    // const [commission, setCommission] = useState('');
    // const [sellingPrice, setSellingPrice] = useState('');
    const [itemImage, setItemImage] = useState({
        file:null,
        preview: null,
    });

    const handleImageFileChange = (event) => {
    const file = event.target.files[0];
     
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setItemImage({ file, 
                preview: reader.result,
            });
        };
        reader.readAsDataURL(file);
    }else{
        setImageData({file:null, preview:null})
    }

    }


    const handlePublish = async () => {
        if (!addonName || !qty ||!basePrice|| !itemImage) {
            alert('Please fill out all fields and upload an image.');
            return;
          }
    const addonData = new FormData()
    addonData.append('addon_name', addonName)
    addonData.append('item_type', foodType)
    // addonData.append('base_price', basePrice)
    // addonData.append('commission', commission)
    addonData.append('price', basePrice)
    addonData.append('quantity', qty)   
    addonData.append('image',itemImage.file)
    // addonData.append('restaurant', restaurantId)
    console.log('FormData to be sent:', Array.from(addonData.entries()));

    try{
        const response = await RestaurantService.createAddon(restaurantId,addonData)     
        alert('Addon created successfully!');
      console.log('Response:', response);
    } catch (error) {
      console.error('Error creating addon:', error);
      alert('Failed to create addon. Please try again.');
    }       

    }



    


    return (
        <div className="border border-gray-300 rounded-lg p-6 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-lg font-bold text-gray-800">New Addon</h1>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 text-gray-500 border border-gray-300 rounded-md hover:bg-gray-100">
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
                    className="w-1/2 border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
            </div>

            {/* Food Type and Qty */}
            <div className="flex gap-4 mb-6">
                {/* Food Type */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food Type</label>
                    <div className="flex items-center gap-4">
                        <button
                            className={`flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700
                                 ${foodType === 'Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                            onClick={() => setFoodType('Veg')}
                        >
                            Veg <CheckCircleIcon className="w-5 h-5 ml-2" />
                        </button>
                        <button
                            className={`flex items-center px-4 py-2 border rounded-md text-gray-700 
                             ${foodType === 'Non-Veg' ? 'border-orange-500' : 'border-gray-300'}`}
                            onClick={() => setFoodType('Non-Veg')}
                        >
                            Non-Veg <ChevronRightIcon className="w-5 h-5 ml-2" />
                        </button>
                    </div>
                </div>
                {/* Qty */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Qty</label>
                    <input
                        type="text"
                        placeholder="Enter quantity in number"
                        value={qty}
                        onChange={(e) => { setQty(e.target.value) }}
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
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
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>
                {/* Commission */} {/* Selling Price */}
                {/* <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Commission</label>
                    <input
                        type="text"
                        value={commission}
                        onChange={(e) => setCommission(e.target.value)}
                        placeholder="Enter commission"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div>
               
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Selling Price</label>
                    <input
                        type="text"
                        value={sellingPrice}
                        onChange={(e) => setSellingPrice(e.target.value)}
                        placeholder="Enter selling price"
                        className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
                    />
                </div> */}
            </div>

            {/* Item Image */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Image</label>
                <div className="w-60 h-48 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
                    {itemImage.preview ? (
                        <img
                            src={itemImage.preview}
                            alt="Item Preview"
                            className="object-cover w-full h-full rounded-md"
                        />
                    ) : (
                        <label htmlFor="upload-item-image" className="flex flex-col items-center cursor-pointer">
                            <img src={Upload} alt="Upload" className="w-10 h-10 mb-2" />
                            <span className="text-sm font-medium text-orange-500">Choose Image</span>
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
        </div>
    );
};

export default AddAddOn;
