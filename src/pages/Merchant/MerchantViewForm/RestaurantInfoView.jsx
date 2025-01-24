import React, { useEffect, useState } from 'react';


const RestaurantInfoView = ({ formData, onDataChange, isEditable }) => {
    // const [data, setData] = useState(restaurant || {})
    const [ownerPopup, setOwnerPopup] = useState(false)
    const [validFields, setValidFields] = useState({
        name: true, // Assuming 'name' is a field
        pincode: true,
        door_no: true,
        street_address_1: true,
        street_address_2: true,
        city: true,
        landmark: true,
        primary_phone: true,
        secondary_phone: true,
        email: true,
        pinto_commission: true,
        gst_number: true,
        owner_name: true,
        owner_phone: true,
    });

    // useEffect(() => {
    //     if (formData) {
    //         setData(formData)
    //     }
    // }, [])


    // useEffect(() => {
    //     console.log("Form Data Updated: ", data)
    //     onDataChange(data);
    // }, [data]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
      onDataChange((prev)=>({
        ...prev, [name]:value,
      }));

        setValidFields((prevState) => ({
            ...prevState,
            [name]: value.trim() !== '', 
        }));
    }
    // const handleOwnerPopup = () => {
    //     setOwnerPopup(true)
    // }

    return (
        <div className="p-6">
            <div className='flex justify-between '>
                <div className='w-4/6'>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Restaurant Name & Address</h2>
                </div>
                <div className='w-2/6'>
                    <h2 className="text-lg font-medium mr-96 text-gray-800 mb-4">Restaurant Location</h2>
                </div>
            </div>

            <div className="flex justify-between gap-4">
                {/* Left Box */}
                <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg">
                    {/* Restaurant Name */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="restaurantName" className="text-sm font-medium text-gray-700">Restaurant Name</label>

                        <input
                            id="restaurantName"
                            type="text"
                            name="name"
                            value={formData?.name || ''}
                            placeholder="Enter restaurant name"
                            disabled={!isEditable}
                            onChange={(e)=>handleInputChange(e)}
                            className={`w-1/2 px-3 py-2 border ${validFields.name ? 'border-gray-300' : 'border-red-500'}rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                    {/* Door Number */}
                    <div className="w-1/6  flex flex-col mb-4">
                        <label htmlFor="doorNumber" className="text-sm font-medium text-gray-700">Door No</label>
                        <input
                            id="doorNumber"
                            name="door_no"
                            value={formData?.door_no || ''}
                            onChange={(e)=>handleInputChange(e)}
                            type="text"
                            placeholder="Enter door number"
                            disabled={!isEditable}
                            className={`w-full px-3 py-2 border ${validFields.door_no ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                    {/*email*/}


                    {/* Street Address 1 and 2 */}
                    <div className="flex justify-between gap-4 mb-4">
                        <div className="w-1/2">
                            <label htmlFor="streetAddress1" className="text-sm font-medium text-gray-700">Street Address 1</label>
                            <input
                                id="streetAddress1"
                                type="text"
                                name="street_address_1"
                                value={formData?.street_address_1 || ''}
                                onChange={(e)=>handleInputChange(e)}
                                placeholder="Enter street address 1"
                                disabled={!isEditable}
                                className={`w-full px-3 py-2 border ${validFields.street_address_1 ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="streetAddress2" className="text-sm font-medium text-gray-700">Street Address 2</label>
                            <input
                                id="streetAddress2"
                                type="text"
                                name="street_address_2"
                                value={formData?.street_address_2 || ''}
                                onChange={(e)=>handleInputChange(e)}
                                placeholder="Enter street address 2"
                                disabled={!isEditable}
                                className={`w-full px-3 py-2 border ${validFields.street_address_2 ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>

                    {/* City and Pincode */}
                    <div className="flex justify-between gap-4 mb-4">
                        <div className="w-1/2">
                            <label htmlFor="city" className="text-sm font-medium text-gray-700">City</label>

                            <input
                                id="city"
                                type="text"
                                name="city"
                                value={formData?.city || ""}
                                onChange={(e)=>handleInputChange(e)}
                                disabled={!isEditable}
                                placeholder="Enter city"
                                className={`w-full px-3 py-2 border ${validFields.city ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                id="pincode"
                                type="text"
                                name="pincode"
                                value={formData?.pincode || ''}
                                onChange={(e)=>handleInputChange(e)}
                                disabled={!isEditable}
                                placeholder="Enter pincode"
                                className={`w-full px-3 py-2 border ${validFields.pincode ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>

                    {/* Landmark */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="landmark" className="text-sm font-medium text-gray-700">Landmark</label>
                        <input
                            id="landmark"
                            name="landmark"
                            value={formData?.landmark || ''}
                            onChange={(e)=>handleInputChange(e)}
                            disabled={!isEditable}
                            type="text"
                            placeholder="Enter landmark"
                            className={`w-full px-3 py-2 border ${validFields.landmark ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                </div>

                {/* Right Box */}

                <div className="w-1/3 bg-gray-100 p-4 border border-gray-300 rounded-lg flex justify-center items-center">

                    <div className="w-24 h-24 border-2 border-gray-300 rounded-lg flex justify-center items-center cursor-pointer hover:bg-gray-200">
                        <span className="text-sm text-gray-700">Detect</span>
                    </div>
                </div>
            </div>

            {/* Contact Numbers */}
            <h2 className="font-medium text-gray-800 mt-6">Contact Number of Restaurant</h2>
            <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
                <div className="">

                    <div className="flex gap-6 w-1/2  ">
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="mobileNumber" className="text-sm text-gray-700 mb-1">
                                Primary Mobile Number
                            </label>
                            <input
                                id="mobileNumber"
                                type="text"
                                name="primary_phone"
                                value={formData?.primary_phone || ''}
                                onChange={(e)=>handleInputChange(e)}
                                disabled={!isEditable}
                                placeholder="Enter mobile number"
                                className={`px-3 py-2 border ${validFields.primary_phone ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div className="flex flex-col w-1/2">
                            <label htmlFor="landlineNumber" className="text-sm text-gray-700 mb-1">
                                Secondary Mobile Number
                            </label>
                            <input
                                id="SecondaryMobileNumber"
                                name="secondary_phone"
                                value={formData?.secondary_phone || ''}
                                onChange={(e)=>handleInputChange(e)}
                                disabled={!isEditable}
                                type="text"
                                placeholder="Enter Secondary Mobile Number"
                                className={`px-3 py-2 border ${validFields.secondary_phone ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 mt-4 mb-4">
                        <label htmlFor="email" className="text-sm font-sm text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={formData?.email || ''}
                            onChange={(e)=>handleInputChange(e)}
                            disabled={!isEditable}
                            type="text"
                            placeholder="Enter email address"
                            className={`w-1/2 px-3 py-2 border ${validFields.email ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-50`}
                        />
                    </div>
                </div>
            </div>


            {/* Pinto Commission and GST Number */}
            <h2 className="font-medium text-gray-800 mt-6">Pinto Commission and GST Number</h2>

            <div className="w-2/3  flex flex-row gap-7 border-gray-300 rounded-lg mt-2">
                <div className="flex gap-6 w-2/10 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
                    {/* Pinto Commission */}
                    <div className="flex flex-col w-full">
                        <label htmlFor="pintoCommission" className="text-sm text-gray-700 mb-1">Pinto Commission (%)</label>
                        <input
                            id="commission_percentage"
                            type="text"
                            name="commission_percentage"
                            value={formData?.commission_percentage || ''}
                            onChange={(e)=>handleInputChange(e)}
                            disabled={!isEditable}
                            placeholder="Enter Pinto Commission"
                            className={`px-3 py-2 border ${validFields.pinto_commission ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>
                </div>

                {/* GST Number */}
                <div className="w-5/6 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
                    <div className="flex flex-col w-3/6">
                        <label htmlFor="gstin" className="text-sm text-gray-700 mb-1">GSTIN</label>
                        <input
                            id="gstin"
                            type="text"

                            name="gstin"
                            value={formData?.gstin || ''}
                            onChange={(e)=>handleInputChange(e)}
                            placeholder="Enter GSTIN"
                            disabled={!isEditable}
                            style={{ textTransform: 'uppercase' }}
                            className={`px-3 py-2 border ${validFields.gst_number ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                    </div>

                </div>
            </div>
            {/* Restaurant Owner Details */}
            <h2 className="font-medium text-gray-800 mt-6">Restaurant Owner Details</h2>
            <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
                <div className="flex flex-row space-x-4 w-1/2">
                    <div className='flex flex-row w-full'>
                        <div className='flex flex-col w-3/4'>
                            <label>Mobile no</label>
                            <input
                                type="number"
                                name="mobile_no"
                                value={formData?.mobile_no || ''}
                                onChange={(e)=>handleInputChange(e)}
                                disabled={!isEditable}
                                className={`px-3 py-2 border ${validFields.owner_name ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            />
                        </div>
                        <div className='flex items-center justify-center w-1/4 mt-6'>
                            <button
                                className='border-[1px] px-4 py-1 text-[#FFFFFF] bg-[#030714] rounded-lg'
                                // onClick={handleOwnerPopup}
                                disabled={!isEditable}
                            >
                                FIND USER
                            </button>
                        </div>
                    </div>
                </div>
                {/* {
                    ownerPopup &&
                    <div
                        className="relative top-full left-0 w-full bg-[#FFFFFF] border-1px border-[#d6cbcb] justify-center items-center z-50 mt-2"
                    >
                        <div className='flex flex-col'>
                            <label className='text-green-600'>User Found!!</label>
                            <div className='grid grid-cols-1'>
                                <div>
                                    <label>Name : ""</label>
                                </div>
                                <div>
                                    <label>Phone :" "</label>
                                </div>
                                <div>
                                    <label>Email : ""</label>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                } */}
            </div>
            {/* <button
            onClick={}>
                save
            </button> */}
        </div>
    );
};

export default RestaurantInfoView;




