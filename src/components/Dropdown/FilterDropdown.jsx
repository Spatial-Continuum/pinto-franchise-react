import React from "react";
import '../../assets/styles/filterDropdown.css'; // Assuming the styles are in this file

const FilterDropdown = () => {
  return (
    <div className="filter-dropdown-container">
      
      <select className="filter-dropdown">
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
