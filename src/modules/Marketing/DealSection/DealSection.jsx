import React from 'react';
import image1 from '../../../assets/images/biryani-transformed0.svg';
import image2 from '../../../assets/images/biryani-transformed1.svg';
import image3 from '../../../assets/images/biryani-transformed2.svg';
import image4 from '../../../assets/images/biryani-transformed3.svg';
import gala from '../../../assets/images/gala_add.svg';
import light from '../../../assets/images/Light.svg';
import vector from '../../../assets/images/vector.svg';

const DealSection = () => {
    return (
        <div>
            <div className="flex justify-between mx-4 mt-3">
                <h2 className="text-lg font-semibold">Deals section</h2>
                <p className="text-md text-orange-500">View All</p>
            </div>

            <div className="flex flex-row gap-5">
                {[image1, image2, image3, image4].map((image, index) => (
                    <div
                        key={index}
                        className=" flex flex-col  w-52 h-52 bg-[#FFFFFF] border-[1px] border-[#9D9D9D] overflow-hidden rounded-lg gap-5 ml-4 mt-3"
                    >
                        {/* Text Content */}
                        <div className="flex flex-col  text-[#1E1E1E]">
                            <p className=" flex justify-between text-sm font-bold mx-3 mt-3">FESTIVE DELIGHTS <span><img src={vector}/></span></p>
                            <p className=" flex flex-row text-[#FF6B00] text-xs gap-1 font-normal ml-3 "><span><img src={light}/></span>FLAT 50% OFF</p>
                            <button className="mt-2 w-11 p-2 h-3 ml-3   text-[#515151] border-[#515151] border-[1px] text-xs font-thin rounded-full flex items-center justify-center">
                                MEALS
                            </button>
                        </div>

                        {/* Image Positioned Bottom-Right */}
                        <img
                            src={image}
                            className="  w-40 h-auto translate-x-12 translate-y-5 object-contain"
                            alt="Festive Dish"
                        />
                    </div>
                ))}

                {/* Add New Card */}
                <div className="flex flex-col w-52 h-52 bg-[#FFFFFF] border-[1px] border-[#FF6B00] rounded-lg justify-center items-center gap-5 ml-4 mt-3">
                    <img src={gala} className="object-contain" alt="Add New" />
                    <p className="">Add New</p>
                </div>
            </div>
        </div>
    );
};

export default DealSection;
