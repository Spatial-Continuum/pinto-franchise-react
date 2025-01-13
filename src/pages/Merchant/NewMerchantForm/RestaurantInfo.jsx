import React, { useEffect, useState } from 'react';


const RestaurantInfo = ({formData, onDataChange}) => {
    const [data, setData] = useState(formData)

    useEffect(()=>{
        console.log("Form Data Updated: ", data)
        onDataChange(data);
    },[data])

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setData((prev) =>({...prev, [name]: value}))
    }
    return (
        <div className="p-6">
            <div className='flex justify-between '>
                <div className='w-4/6'>
                    <h2 className="text-lg font-medium text-gray-800 mb-4">Restaurant Name & Address</h2>
                </div>
                <div className='w-1/3'>
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
                            value={data.name}
                            placeholder="Enter restaurant name"
                            onChange={handleInputChange}
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Door Number */}
                    <div className="w-1/6  flex flex-col mb-4">
                        <label htmlFor="doorNumber" className="text-sm font-medium text-gray-700">Door No</label>
                        <input
                            id="doorNumber"
                            name="door_no"
                            value={data.door_no}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter door number"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                value={data.street_address_1 || ''}
                                onChange={handleInputChange}
                                placeholder="Enter street address 1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="streetAddress2" className="text-sm font-medium text-gray-700">Street Address 2</label>
                            <input
                                id="streetAddress2"
                                type="text"
                                name="street_address_2"
                                value={data.street_address_2 || ''}
                                onChange={handleInputChange}
                                placeholder="Enter street address 2"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                value={data.city || ""}
                                onChange={handleInputChange}
                                placeholder="Enter city"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="pincode" className="text-sm font-medium text-gray-700">Pincode</label>
                            <input
                                id="pincode"
                                type="text"
                                name="pincode"
                                value={data.pincode || ''}
                                onChange={handleInputChange}
                                placeholder="Enter pincode"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Landmark */}
                    <div className="flex flex-col mb-4">
                        <label htmlFor="landmark" className="text-sm font-medium text-gray-700">Landmark</label>
                        <input
                            id="landmark"
                            name="landmark"
                            value={data.landmark || ''}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter landmark"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                            value={data.primary_phone || ''}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col w-1/2">
                        <label htmlFor="landlineNumber" className="text-sm text-gray-700 mb-1">
                            Secondary Mobile Number
                        </label>
                        <input
                            id="SecondaryMobileNumber"
                            name="secondary_phone"
                            value={data.secondary_phone || ''}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter Secondary Mobile Number"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <div className="flex flex-col w-1/2 mt-4 mb-4">
                        <label htmlFor="email" className="text-sm font-sm text-gray-700 mb-1">Email</label>
                        <input
                            id="email"
                            name="email"
                            value={data.value}
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Enter email address"
                            className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              id="pintoCommission"
              type="text"
              name="pinto_commission"
              value={data.pinto_commission || ''}
              onChange={handleInputChange}
              placeholder="Enter Pinto Commission"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          </div>

          {/* GST Number */}
          <div className="w-3/6 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
          <div className="flex flex-col w-full">
            <label htmlFor="gstNumber" className="text-sm text-gray-700 mb-1">GSTIN</label>
            <input
              id="gstNumber"
              type="text"
              name="gst_number"
              value={data.gst_number || ''}
              onChange={handleInputChange}
              placeholder="Enter GSTIN"
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        
      </div>
      </div>



            {/* Restaurant Owner Details */}
            <h2 className="font-medium text-gray-800 mt-6">Restaurant Owner Details</h2>
            <div className="w-2/3 bg-gray-100 p-4 border border-gray-300 rounded-lg mt-2">
            <div className="">
                
                <div className="flex space-x-4 w-1/2">
                    {/* Owner Name */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-sm text-gray-700">Owner Name</label>
                        <input
                            type="text"
                            name="owner_name"
                            value={data.owner_name || ''}
                            onChange={handleInputChange}
                            placeholder="Enter owner name"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Owner Mobile Number */}
                    <div className="flex flex-col w-1/2">
                        <label className="text-sm text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            name="owner_phone"
                            value={data.owner_phone || ''}
                            onChange={handleInputChange}
                            placeholder="Enter mobile number"
                            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
            </div>
            </div>

        </div>
    );
};

export default RestaurantInfo;




