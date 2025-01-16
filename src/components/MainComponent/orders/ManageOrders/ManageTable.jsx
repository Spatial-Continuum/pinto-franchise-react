import React from 'react'
import DataTable from 'react-data-table-component'
import { useState } from 'react';

const ManageTable = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const data = [{
        shopName: "ABC Restaurant",
        gstin: "1234567890",
        fssai: "1234567890",
        cp: "20%",
        addon: <img alt="Add-on" />,
        phoneNumber: "+91 1234567890",
        email: "abc@example.com",
        timings: "10:00 AM - 10:00 PM"
    }]
    const columns = [{
        name: "DATE|TIME",
        selector: "",
        sortable: true,
    },

    {
        name: "ORDER ID",
        selector: ""
    },
    {
        name: "TYPE",
        selector: ""
    },
    {
        name: "RESTAURANT",
        selector: ""
    },

    {
        name: "PHONE",
        selector: "",
    },
    {
        name: "MENU",
        selector: ""

    },
    {
        name: "STATUS",
        selector: ""


    },
    {
        name: "AMOUNT",
        selector: ""
    },
    {
        name: "PARTNER ID",
        selector: ""
    },
    {
        name: "CUSTOMER",
        selector: ""
    },
    {
        name: "ACTION",
        cell: (row) => (
            <div className='flex flex-row'>
                <button
                    style={{
                        marginRight: "8px",
                        backgroundColor: "#F9DFDF",
                        color: "red",
                        border: "1px solid red",
                        padding: "5px",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                // onClick={()=>handleReject(row)}
                >
                    Reject
                </button>
                <button
                    style={{
                        backgroundColor: "#D8EBDA",
                        color: "#00840D",
                        border: "1px solid green",
                        padding: "5px ",
                        borderRadius: "4px",
                        cursor: "pointer",
                    }}
                // onClick={() => handleLaunch(row)}
                >
                    Launch
                </button>
            </div>
        )
    }
    ]
    const customStyles = {
        rows: {
            style: {
                height: "56px",
                backgroundColor: "#FFFFFF",
            },
        },
        headCells: {
            style: {
                backgroundColor: "#F0F8FF",
                color: "#A3A3A3",
                fontWeight: "700",
                Height: "60px"
            },
        },
    };

    return (
        <div className="hide-scrollbar rounded-md gap-5  border-[1px] border-green-600 overscroll-x-contain ">
            {/* {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>} */}
            <DataTable

                columns={columns}
                data={data}
                highlightOnHover
                // fixedHeader
                striped
                customStyles={customStyles}
            />

            <div className="relative">
                <button onClick={handleOpenModal} className="bg-green-500 text-white p-2 rounded">
                    Open Modal
                </button>

                {modalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-5 rounded-lg w-3/4 h-auto overflow-auto">
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b pb-4">
                                <div className="flex items-center">
                                    <img src="logo.png" alt="Logo" className="rounded-full w-12 h-12 mr-4" />
                                    <div>
                                        <h2 className="text-xl font-semibold">Restaurant Name</h2>
                                        <p className="text-sm text-gray-500">Restaurant Address</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">+91 1234567890</p>
                                    <p className="text-sm text-gray-500">10:00 AM - 10:00 PM</p>
                                </div>
                            </div>

                            {/* Modal Body */}
                            <div className="grid grid-cols-2 gap-5 mt-5">
                                {/* Left Column */}
                                <div>
                                    <div className="flex justify-between items-center">
                                        <p className="font-medium">Order ID:12345</p>
                                        <p className="text-sm text-gray-500"></p>
                                    </div>
                                    <p className="text-sm text-gray-500">Date: 12th Jan 2025</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <label className="font-medium">Status</label>
                                        <select className="border rounded px-2 py-1">
                                            <option>Paid</option>
                                            <option>On the way</option>
                                        </select>
                                    </div>
                                    <hr className="my-4" />

                                    {/* Item, Price, Review Table */}
                                    <div>
                                        <div className="grid grid-cols-3 gap-4 font-medium mb-2">
                                            <p>Item</p>
                                            <p>Price</p>
                                            <p>Review</p>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4">
                                            <p>Pizza</p>
                                            <p>$20</p>
                                            <p>⭐⭐⭐⭐⭐</p>
                                        </div>
                                    </div>
                                    <hr className="my-4" />

                                    {/* Description */}
                                    <div>
                                        <p className="font-medium">Description</p>
                                        <p className="text-sm text-gray-500">Delicious cheese pizza with extra toppings.</p>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div>
                                    {/* Delivery Address */}

                                    <p className="font-medium">Delivery Address</p>
                                    <div className='flex flex-row justify-between'>
                                        <div>

                                            <p className="text-sm text-gray-500">123 Street, City</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-500">John Doe</p>
                                            <p className="text-sm text-gray-500">+91 9876543210</p>
                                            <p className="text-sm text-gray-500">john@example.com</p>
                                        </div>
                                    </div>
                                    <hr className="my-4" />

                                    {/* Delivery Partner */}
                                    <div>
                                        <p className="font-medium">Delivery Partner</p>
                                        <div className="grid grid-cols-5 gap-4 mt-2">
                                            <p>ID: 123</p>
                                            <p> Jane Doe</p>
                                            <p>+91 876543210</p>
                                            <p className='text-green-600'> Online </p>
                                            <p>⭐⭐⭐⭐⭐</p>
                                        </div>
                                    </div>

                                    <hr className="my-4" />

                                    {/* Order and Payment Detail */}
                                    <div>
                                        <div className="flex">
                                        <p className="font-medium">Order</p>

                                        </div>
                                        <div className="grid grid-cols-2 gap-3 mt-2">
                                            
                                            <div className='grid grid-cols-2'>
                                                
                                                <div>
                                                    <p className="font-medium">Sub Total</p>
                                                    <p className="font-medium">Shipping Fee</p>
                                                    <p className="font-medium">Delivery Fee</p>
                                                    <p className="font-medium">Tax</p>
                                                    <p className="font-medium">Total</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-gray-500">$20</p>
                                                    <p className="text-sm text-gray-500">$5</p>
                                                    <p className="text-sm text-gray-500">$2</p>
                                                    <p className="text-sm text-gray-500">$3</p>
                                                    <p className="text-sm text-gray-500">$30</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-medium">Payment Detail</p>
                                                <div>
                                                    <p className="font-normal">UPI ID: example@upi</p>
                                                    <p className="text-sm text-gray-500">Date: 12th Jan 2025</p>
                                                    <p className="text-sm text-gray-500">Status: Payment Successful</p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="mt-5 flex justify-end gap-3">
                                <button onClick={handleCloseModal} className="bg-red-500 text-white py-2 px-4 rounded">
                                    Close
                                </button>
                                <button className="bg-green-500 text-white py-2 px-4 rounded">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default ManageTable
