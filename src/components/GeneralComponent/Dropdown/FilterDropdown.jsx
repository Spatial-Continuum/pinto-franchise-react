import React from "react";
// Assuming the styles are in this file

const FilterDropdown = ({value, onChange, options}) => {
  return (
    <div className="  w-32   h-10  ">
      
      <select className="w-32 bg-[#FFFFFF]  border-[#A7D7FF] border-[1px] rounded-lg h-10 px-2"
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        >
          <option value="">All Partners</option>
          {options.map((option)=>(
            <option key={option.value} value={option.value}>
              {option.label}  
            </option>
          ))}
      </select>
    </div>
  );
};

export default FilterDropdown;
