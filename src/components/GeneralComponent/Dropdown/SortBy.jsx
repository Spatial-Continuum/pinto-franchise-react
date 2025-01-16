import React from 'react';

const SortBy = ({ options, onSortChange }) => {
  return (
    <div >
      <label htmlFor="sort-by"></label>
      <select
        id="sort-by"
        onChange={(e) => onSortChange(e.target.value)}
        style={{ marginLeft: '10px', padding: '5px' }}
        className='  h-full  border-[#A7D7FF] border-[1px] rounded-lg'
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortBy;
