import React, { useEffect } from 'react'
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getRestaurantById, selectApiError, selectApiLoading } from '../../../../../redux/slices/restaurant';


const CustomerDetail = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const restaurantDetails = useSelector(selectApiError)
    const loading = useSelector(selectApiLoading)

    useEffect(() => {
        if (id) {
            dispatch(getRestaurantById(id))
        }
    }, [id, dispatch]
    )
    return (
        <>
            <MainLayout>
                <div className="w-full p-4">
                    {loading && (
                        <div className="text-center">
                            <p>Loading...</p>
                        </div>
                    )}


                    {!loading && restaurantDetails && (
                        <>

                            {/* Card for Restaurant and Details */}
                            <div className="border rounded-lg p-4 shadow-sm">
                                <div className="flex justify-between items-center">
                                    {/* Left Section */}
                                    <div className="flex items-center gap-4">
                                        {/* Restaurant Image */}
                                        <img
                                            src={restaurantDetails.image}
                                            alt={restaurantDetails.name || "Restaurant"}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                        {/* Restaurant Details */}
                                        <div>
                                            <h2 className="font-bold text-lg">{restaurantDetails.name}</h2>
                                            <p className="text-sm text-gray-500">{restaurantDetails.street_address_1},{restaurantDetails.street_address_2}</p>
                                        </div>
                                    </div>
                                    {/* Right Section */}
                                    <div className="text-right">
                                        <p className="font-bold text-sm">{restaurantDetails.primary_phone}-{restaurantDetails.secondary_phone}</p>
                                        <p className="text-sm text-gray-500">Open: 10:00 AM - 10:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Two-Column Layout */}
                            <div className="flex mt-6 gap-4">
                                {/* Left Column */}
                                <div className="w-2/3">
                                    <h2 className="font-bold text-xl mb-4">Customer Details</h2>
                                    <div className="border rounded-lg p-4 space-y-4">
                                        {/* Input Fields */}
                                        <div className='w-1/2 '>
                                            <label className="block font-medium">Customer Name</label>
                                            <input
                                                type="text"
                                                className="w-full  border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <label className="block font-medium">Phone Number</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block font-medium">Email</label>
                                                <input
                                                    type="email"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <label className="block font-medium">Street Address 1</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block font-medium">Street Address 2</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <label className="block font-medium">City</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <label className="block font-medium">Pincode</label>
                                                <input
                                                    type="text"
                                                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block font-medium">Landmark</label>
                                            <input
                                                type="text"
                                                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        {/* Buttons */}
                                        <div className="flex justify-center gap-4 mt-4">
                                            <button className="px-6 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200">
                                                Clear
                                            </button>
                                            <button className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600">
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="w-1/3">
                                    <h2 className="font-bold text-xl mb-4">Customer Location</h2>
                                    <div className="border rounded-lg p-4 h-full flex items-center justify-center">
                                        <p>Map or location-based content goes here</p>
                                    </div>
                                </div>
                            </div>

                        </>
                    )}
                </div>
            </MainLayout>
        </>
    )
}

export default CustomerDetail



