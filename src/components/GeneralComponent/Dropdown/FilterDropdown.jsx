import React from "react";
// Assuming the styles are in this file

const FilterDropdown = ({value, onChange, options}) => {
  return (
    <div className="  bg-slate-600 w-32   h-10 rounded-sm -ml-3">
      
      <select className="w-32 bg-slate-200  border-[#c5c1c1] border-[2px] rounded-sm h-10"
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
