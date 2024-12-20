import React from 'react';

const PropsSearchBox = ({ placeholder, img }) => {
  return (
    <div className="flex items-center w-80 h-10 bg-slate-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
      {img && (
        <span className="w-6 h-6 text-gray-500 ml-2 flex items-center">
          <img src={img} alt="icon" className="w-full h-full object-contain" />
        </span>
      )}  
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full px-2 text-gray-700 bg-transparent items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      />
    </div>
  );
};

export default PropsSearchBox;
