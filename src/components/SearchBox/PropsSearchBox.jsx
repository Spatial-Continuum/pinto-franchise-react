import React from 'react';

const PropsSearchBox = ({ placeholder }) => {
  return (
    <div className="flex items-center w-80 h-10 bg-slate-100 rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full h-full px-4 text-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
      />
    </div>
  );
};

export default PropsSearchBox;
