import React from 'react'


const SearchBox = ({ placeholder, img, onSearch }) => {
  return (
    <div className="ml-5 w-80 h-10 bg-slate-900  lg:flex  hover:border-[#FAFAFA] ">
      {img && (
        <span className="w-6 h-6 text-gray-500 ml-2 flex items-center">
          <img src={img} alt="icon" className="w-full h-full object-contain" />
        </span>
      )}  
      <input 
        type="text"
        placeholder={placeholder} 
        className="w-full h-full px-2 text-gray-700 bg-[#FFFFFF] items-center focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
        onChange={(e) => onSearch(e.target.value)}
      />

    </div>
  )
}

export default SearchBox
