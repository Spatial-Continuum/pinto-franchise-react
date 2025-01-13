import React from 'react';
import Banner from '../../../assets/images/spotlightbanner.svg';
import gala from '../../../assets/images/gala_add.svg'
import vector from '../../../assets/images/vector.svg'

const ShowSpotLight = () => {
  return (
    <div className="pl-4">
     
      <h2 className="text-2xl font-semibold mb-4">City Spotlight</h2>

      
      <div className="flex flex-wrap mt-8 gap-4">
        
        <div className=" w-[500px] h-64 flex items-center justify-center border border-[#EDEDED] bg-[#FFFFFF] rounded-lg shadow-md">
          <img
            src={Banner}
            alt="City Spotlight Banner"
            className="object-cover w-full h-56 "
          />
        </div>

        
        <div className="w-48 h-64 flex flex-col items-center justify-center border border-[#FF6B00] bg-[#FFFFFF] rounded-lg shadow-md">
          <img src={vector}  />
          <p className="text-md text-black-500 mt-3">Cutomize</p>
        </div>
      </div>
    </div>
  );
};

export default ShowSpotLight;
