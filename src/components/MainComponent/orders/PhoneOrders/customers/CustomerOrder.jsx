import React from 'react'

const CustomerOrder = () => {
    return (

        <div className="">
            {/* Two Columns */}
            <div className="flex">
                {/* Left Column */}
                <div className="w-4/6 pr-6">
                    <h1 className="text-2xl font-normal mb-4">Customer Order</h1>
                    <div className="border border-[#DEDEDE] bg-[#FAFAFA] p-4 rounded-lg">
                        {/* Row 1 */}
                        <div className="grid grid-cols-3 gap-4 mb-4">
                            <div>
                                <label htmlFor="customerName" className="block mb-2 text-sm font-medium">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    id="customerName"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    id="phoneNumber"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="mb-4 w-1/3 mr-4">
                            <label htmlFor="doorNo" className="block mb-2 text-sm font-medium">
                                Door No
                            </label>
                            <input
                                type="text"
                                id="doorNo"
                                className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                            />
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="streetAddress1" className="block mb-2 text-sm font-medium">
                                    Street Address 1
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress1"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                            <div>
                                <label htmlFor="streetAddress2" className="block mb-2 text-sm font-medium">
                                    Street Address 2
                                </label>
                                <input
                                    type="text"
                                    id="streetAddress2"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Row 4 */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="city" className="block mb-2 text-sm font-medium">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                            <div className='w-3/6'>
                                <label htmlFor="pincode" className="block mb-2 text-sm font-medium">
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    id="pincode"
                                    className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                                />
                            </div>
                        </div>

                        {/* Row 5 */}
                        <div className="mb-4">
                            <label htmlFor="landmark" className="block mb-2 text-sm font-medium">
                                Landmark
                            </label>
                            <input
                                type="text"
                                id="landmark"
                                className="w-full border bg-[#FFFFFF] border-[#C9C9C9] p-2 rounded-lg"
                            />
                        </div>

                        {/* Dropdown */}
                        <div className="mb-4 w-1/5">
                            <label htmlFor="labelDropdown" className="block mb-2 text-sm font-medium">
                                Label
                            </label>
                            <select
                                id="labelDropdown"
                                className="w-full border border-gray-300 p-2 rounded-lg"
                            >
                                <option>Home</option>
                                <option>Work</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Buttons */}
                        <div className="text-center">
                            <button className="bg-[#FAFAFA] text-[#030714]  px-10 py-1 border-[1px] border-[#030714] rounded-lg mr-4">
                                Clear
                            </button>
                            <button className="bg-[#004680] text-[#FFFFFF] px-10 py-1 border-[1px] border-[#030714] rounded-lg">
                                NEXT
                            </button>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-2/6 pr-6">
                    <h2 className="text-xl font-normal mb-4">Pin Customer Location</h2>
                    <div className='border  border-[#DEDEDE] bg-[#FAFAFA] p-4 rounded-lg'>
                        {/* Additional Content for the second column */}
                        <div>
                            <p>location detecting</p>
                        </div>

                        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CustomerOrder





