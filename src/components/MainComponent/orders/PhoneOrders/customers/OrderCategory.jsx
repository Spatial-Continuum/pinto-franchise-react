import React from 'react';
import PropsSearchBox from '../../../../GeneralComponent/SearchBox/PropsSearchBox';
import rectangle from '../../../../../assets/images/rectangularImage.svg'
import MainLayout from '../../../../GeneralComponent/Layout/MainLayout';
import { Switch } from "@material-tailwind/react";
const OrderCategory = () => {
    const categories = ['Biriyani', 'Parotta', 'Chicken 65', 'Fried Rice', 'Kebabs', 'Shawarma', 'Biriyani', 'Parotta', 'Chicken 65', 'Fried Rice', 'Kebabs', 'Shawarma'];
    const dishes = [
        {
            name: 'Chicken Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.5,
            timing: '30-40 mins',
            price: '₹150',
        },
        {
            name: 'Mutton Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.7,
            timing: '25-35 mins',
            price: '₹200',
        },
        {
            name: 'Egg Parotta',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.2,
            timing: '20-30 mins',
            price: '₹50',
        },
        {
            name: 'Chicken Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.5,
            timing: '30-40 mins',
            price: '₹150',
        },
        {
            name: 'Mutton Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.7,
            timing: '25-35 mins',
            price: '₹200',
        },
        {
            name: 'Egg Parotta',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.2,
            timing: '20-30 mins',
            price: '₹50',
        },
        {
            name: 'Chicken Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.5,
            timing: '30-40 mins',
            price: '₹150',
        },
        {
            name: 'Mutton Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.7,
            timing: '25-35 mins',
            price: '₹200',
        },
        {
            name: 'Egg Parotta',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.2,
            timing: '20-30 mins',
            price: '₹50',
        },
        {
            name: 'Chicken Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.5,
            timing: '30-40 mins',
            price: '₹150',
        },
        {
            name: 'Mutton Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.7,
            timing: '25-35 mins',
            price: '₹200',
        },
        {
            name: 'Egg Parotta',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.2,
            timing: '20-30 mins',
            price: '₹50',
        },
        {
            name: 'Chicken Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.5,
            timing: '30-40 mins',
            price: '₹150',
        },
        {
            name: 'Mutton Biriyani',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.7,
            timing: '25-35 mins',
            price: '₹200',
        },
        {
            name: 'Egg Parotta',
            image: 'https://via.placeholder.com/150',
            delivery: 'Free Delivery',
            rating: 4.2,
            timing: '20-30 mins',
            price: '₹50',
        },
    ];

    return (
        <div>
            <MainLayout>
                <div>
                    {/* Top Full-Width Image */}
                <div className="relative">
                    <img
                        src={rectangle}
                        alt="Top Banner"
                        className="w-full h-64 object-cover"
                    />
                    {/* PropSearchBox */}
                    <div className="absolute inset-48 inset-x-8 flex  gap-4">
                        <PropsSearchBox placeholder="Search Restaurant" />
                        <input
                            type="text"
                            placeholder="Restaurant ID"
                            className="w-1/12 h-10 px-4 text-gray-700 bg-[#FFFFFF] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                </div>

                {/* Menu Title, Filter, and Search */}
                <div className="flex  items-center mt-6 px-6">
                    <div className="flex w-8/12 justify-between items-center ">
                        <button className="text-[#FF6B00] font-semibold text-lg border-b-4 rounded- border-[#FF6B00]">Menu</button>
                        <div className="flex items-center gap-2">
                            <div className='flex items-center gap-2'>
                            <Switch color="green" defaultChecked />
                            <span className="text-[#00A210] font-medium">Veg</span>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer bg-transparent" />
                                <div className="w-11 h-6 bg-[#FFFFFF] peer-focus:outline-none peer-focus:ring-2  rounded-lg "></div>
                            </label>

                        </div>

                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Search"
                            className=" focus:outline-none focus:border-orange-500"
                        />

                    </div>
                </div>
                <div className="w-full mx-6 h-px bg-gray-300"></div>


                {/* Category Heading */}
                <h2 className="text-xl font-bold mt-6 px-6">Category</h2>
                <div className="flex flex-wrap gap-4 mt-4 px-6">
                    {categories.map((category, index) => (
                        <span
                            key={index}
                            className="bg-[#FAFAFA]  border-[#030714] border-[1px] px-6 py-2 rounded-full text-gray-700 hover:bg-orange-500 hover:text-white cursor-pointer"
                        >
                            {category}
                        </span>
                    ))}
                </div>

                {/* Dishes Grid */}
                <div className="grid grid-cols-6 gap-6 mt-6 px-6">
                    {dishes.map((dish, index) => (
                        <div key={index} className="flex flex-col items-start">
                            {/* Card Image */}
                            <div className="relative w-full h-40 rounded-lg overflow-hidden">
                                <img
                                    src={dish.image}
                                    alt={dish.name}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute bottom-2 right-2 bg-white text-green-500 font-bold text-sm px-3 py-1 rounded">
                                    ADD
                                </button>
                            </div>

                            {/* Dish Name and Delivery */}
                            <div className="flex justify-between w-full mt-2">
                                <span className="font-semibold">{dish.name}</span>
                                <span className="text-xs items-center  py-1 px-1 text-[#FF00C7] bg-[#f1ceea] rounded-lg">{dish.delivery}</span>
                            </div>

                            {/* Rating and Timing */}
                            <div className="flex items-center text-gray-600 mt-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-yellow-400 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.389 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.175 0l-3.389 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.293 8.397c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                                </svg>
                                {dish.rating}
                                <span className="ml-4">{dish.timing}</span>
                            </div>

                            {/* Price */}
                            <div className="text-lg font-bold mt-1">{dish.price}</div>
                        </div>
                    ))}
                </div>
                </div>
            </MainLayout>

        </div>
    );
};



export default OrderCategory;
