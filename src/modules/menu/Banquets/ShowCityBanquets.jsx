import React from 'react';
import Banquets1 from '../../../assets/images/Banquets1.svg';
import Banquets2 from '../../../assets/images/Banquets2.svg';
import gala from '../../../assets/images/gala_add.svg';

const ShowCityBanquets = () => {
  const banquets = [
    Banquets1,
    Banquets2,
  ];

  return (
    <div className="pl-4">
      
      <h2 className="text-2xl font-semibold mb-4">Banquets in Your City</h2>

      
      <div className="flex flex-wrap mt-8 gap-4">
      
        {banquets.map((banquet, index) => (
          <div
            key={index}
            className=" w-96  flex  border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md"
          >
            <img
              src={banquet}
              alt={`Banquet ${index + 1}`}
              className="object-cover  rounded-lg"
            />
          </div>
        ))}

        {/* Empty Div */}
        <div className="w-96 h-64 flex flex-col items-center justify-center border border-[#FF6B00] bg-[#FFFFFF] rounded-lg shadow-md">
            <img src={gala}/>
          <p className="text-md mt-3 text-black-500">Add New</p>
        </div>
      </div>
    </div>
  );
};

export default ShowCityBanquets;
