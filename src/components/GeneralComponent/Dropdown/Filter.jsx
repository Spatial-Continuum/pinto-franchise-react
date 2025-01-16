import React from 'react';

const Filter = ({ options, onFilterChange }) => {
  return (
    <div>
      <label htmlFor="filter" className="text-sm font-medium text-gray-700"></label>
      <select
        id="filter"
        onChange={(e) => onFilterChange(e.target.value)}
        className="border-[1px] h-full border-[#A7D7FF]  px-2 py-1 ml-3 rounded-md text-sm"
      >
        <option value="" disabled selected>
          Select a filter
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
