import React from 'react';
import PD1 from '../../../assets/images/PD1.svg';
import PD2 from '../../../assets/images/PD2.svg';
import PD3 from '../../../assets/images/PD3.svg';
import PD4 from '../../../assets/images/PD4.svg';
import call from '../../../assets/images/call.svg';

const ShowPopularDish = () => {
    const popularDishes = [
        { image: PD1 },
        { image: PD2 },
        { image: PD3 },
        { image: PD4 },
    ];

    return (
        <div className="">
            <div className="flex ml-5 justify-between">
            <h2 className="text-2xl font-semibold mb-4">Popular Dishes / You've Tried</h2>
            <p className="mr-16 text-lg font-normal text-[#FB6B00]">View all</p>
            </div>

            {/* Popular dishes row */}
            <div className="flex flex-row ml-5 mt-8 gap-5">
                {/* Map through the popularDishes array */}
                {popularDishes.map((dish, index) => (
                    <div key={index} className="flex flex-col w-52 h-52 justify-center border-[#EDEDED] rounded-lg">
                        {/* Image div with 52x52 size */}
                        <div className="w-full h-full flex border-[#F2F2F2] border-[1px] rounded-lg overflow-hidden bg-[#FFFFFF]">
                            <img
                                src={dish.image}
                                alt="Food Name"
                                className="object-cover w-full h-full" 
                            />
                        </div>
                        {/* Food Name text below image */}
                        <h6 className="mt-2 text-sm font-semibold ">Food Name</h6>
                    </div>
                ))}

                
                
                    <div className="w-52 mb-5 flex flex-col items-center justify-center border border-[#FF6B00] bg-[#FFFFFF] rounded-lg shadow-md">
                        <img src={call} alt="Add New" />
                        <p className="mt-2 text-xs">Add New</p>
                    </div>
                   
               
            </div>
        </div>
    );
};

export default ShowPopularDish;
