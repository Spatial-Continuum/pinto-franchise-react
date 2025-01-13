import React from "react";

const Checkout = () => {
    // Full data inside the component
    const checkoutData = {
        cartItems: [
            {
                id: 1,
                name: "Chicken Burger",
                description: "Grilled patty with lettuce, tomato, and sauce.",
                price: 200,
                quantity: 2,
                image: "https://via.placeholder.com/64x64?text=Burger",
                
            },
            {
                id: 2,
                name: "Veggie Pizza",
                description: "Cheese burst with bell peppers, olives, and corn.",
                price: 400,
                quantity: 1,
                image: "https://via.placeholder.com/64x64?text=Pizza",
                
            },
            {
                id: 3,
                name: "Pasta Alfredo",
                description: "Creamy white sauce pasta with mushrooms.",
                price: 300,
                quantity: 1,
                image: "https://via.placeholder.com/64x64?text=Pasta",
             
            },
        ],
        customerDetails: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+91 9876543210",
            instruction:"Delievry at home",
        },
        addressDetails: {
            address: "123, Main Street, Downtown, Springfield",
            landmark: "Near City Mall",
            label: ["Home", "Work", "Other"],
        },
        addOns: [
            {
                id: 1,
                name: "Lemon Soda",
                description: "250ml refreshing lemon drink.",
                price: 50,
                image: "https://via.placeholder.com/100x100?text=Soda",
            },
            {
                id: 2,
                name: "French Fries",
                description: "Crispy golden fries with ketchup.",
                price: 100,
                image: "https://via.placeholder.com/100x100?text=Fries",
            },
            {
                id: 3,
                name: "Choco Lava Cake",
                description: "Warm chocolate cake with gooey center.",
                price: 120,
                image: "https://via.placeholder.com/100x100?text=Cake",
            },
        ],
        priceDetails: {
            subtotal: 1100,
            discount: -50,
            taxes: 30,
            deliveryCharge: 20,
            grandTotal: 1100,
        },
    };

    return (
        <div className="flex flex-wrap md:flex-nowrap gap-6 p-4">
            {/* Left Column */}
            <div className="w-full md:w-1/2 space-y-6">
                {/* Cart Items Section */}
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {checkoutData.cartItems.length} Items added in the cart
                    </h2>
                    <button className="text-blue-600 font-semibold">Explore Menu</button>
                </div>
                <div className="space-y-4">
                    {checkoutData.cartItems.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center p-4 bg-gray-100 rounded-lg"
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 rounded-md object-cover"
                            />
                            <div className="ml-4 flex-1">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-600">{item.description}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">₹{item.price}</p>
                                <div className="flex items-center space-x-2 mt-2">
                                    <button className="px-2 py-1 bg-gray-200 rounded">-</button>
                                    <span>{item.quantity}</span>
                                    <button className="px-2 py-1 bg-gray-200 rounded">+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Delivery Instructions */}
                <div>
                    
                        <div  className="mb-4">
                            <h3 className="text-lg font-semibold">Delivery Instruction</h3>
                            <p>{checkoutData.customerDetails.instruction}</p>
                        </div>
                  
                </div>

                {/* Add-ons */}
                <div>
                    <h3 className="text-lg font-semibold ml-4 ">Add-on</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-4">
                        {checkoutData.addOns.map((addon) => (
                            <div
                                key={addon.id}
                                className="bg-gray-100 rounded-md p-4 "
                            >
                                <img
                                    src={addon.image}
                                    alt={addon.name}
                                    className="w-full h-24 object-cover rounded-md"
                                />
                                <h4 className="font-medium text-left mt-2">{addon.name}</h4>
                                <p className="text-gray-600">₹{addon.price}</p>
                                <button className="w-full mt-2 bg-blue-600 text-white rounded-md py-1">
                                    Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2 space-y-6">
                {/* Customer Details */}
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Customer Details</h2>
                        <button className="text-blue-600 font-semibold">Edit</button>
                    </div>
                    <div className="flex justify-between text-sm mt-2">
                        <p>{checkoutData.customerDetails.name}</p>
                        <p>{checkoutData.customerDetails.email}</p>
                    </div>
                </div>

                {/* Address Details */}
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Address Details</h2>
                        <button className="text-blue-600 font-semibold">Edit</button>
                    </div>
                    <p className="text-sm mt-2">{checkoutData.addressDetails.address}</p>
                </div>

                {/* Landmark */}
                <div>
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-semibold">Landmark</h2>
                        <button className="text-blue-600 font-semibold">Edit</button>
                    </div>
                    <p className="text-sm mt-2">{checkoutData.addressDetails.landmark}</p>
                </div>

                {/* Label Options */}
                <div>
                    <h3 className="text-lg font-semibold">Label</h3>
                    <div className="flex space-x-4 mt-2">
                        {checkoutData.addressDetails.label.map((label, index) => (
                            <button
                                key={index}
                                className="px-4 py-2 bg-gray-200 rounded"
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Price Details */}
                <div>
                    <button className="w-full bg-gray-200 py-2 rounded">
                        Apply Coupon
                    </button>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold">Price Details</h3>
                        {Object.entries(checkoutData.priceDetails).map(([key, value]) => (
                            <div className="flex justify-between mt-2" key={key}>
                                <p>{key.replace(/([A-Z])/g, " $1")}</p>
                                <p>₹{value}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <button className="w-full bg-green-600 text-white py-2 rounded">
                    Place Order
                </button>
                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Pay with RazorPay
                </button>
            </div>
        </div>
    );
};

export default Checkout;
