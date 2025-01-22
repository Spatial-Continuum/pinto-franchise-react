import React from 'react';

const SearchBox = ({ placeholder, img, onSearch, value ,className }) => {
  return (
    <div className={`flex w-80 h-10 border-[#A7D7FF] border-[1px] rounded-lg overflow-hidden ${className}`}>
      {img && (
        <span className="flex items-center justify-center w-10 h-full bg-white">
          <img src={img} alt="icon" className="w-6 h-6 object-contain" />
        </span>
      )}
      <input
        type="text"
        placeholder={placeholder}
        className="flex-grow h-full px-2 text-gray-700 bg-white focus:outline-none"
        onChange={(e) => onSearch(e.target.value)}
        value={value}
      />
    </div>
  );
};

export default SearchBox;
