import React from "react";
// Assuming the styles are in this file

const FilterDropdown = () => {
  return (
    <div className="  bg-slate-600 w-32   h-10 rounded-sm -ml-3">
      
      <select className="w-32 bg-slate-200  border-[#c5c1c1] border-[2px] rounded-sm h-10">
        <option className="allpartners" value="">All Partners</option>
        <option value="partner1">Partner 1</option>
        <option value="partner2">Partner 2</option>
        <option value="partner3">Partner 3</option>
        <option value="partner4">Partner 4</option>
      </select>
    </div>
  );
};

export default FilterDropdown;
