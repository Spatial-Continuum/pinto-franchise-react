<div className="mb-6 ml-12 relative">
  <label className="block text-sm mb-2 w-40">Select Cuisine</label> 
  <div className="flex border rounded px-2 py-1 justify-between bg-white cursor-pointer">
    <div>
      {formState?.selectedCuisines?.length > 0
        ? formState?.selectedCuisines[0]
        : "Select Cuisine"} 
    </div>  
    <div>
      <ChevronDownIcon
        onClick={toggleDropdown}
        className={`h-4 w-4 transform transition-transform m-2 duration-200 ${
          formState.dropdownOpen ? "rotate-180" : ""
        }`}
      />
    </div> 
  </div>

  {/* Dropdown */}
  {formState.dropdownOpen && (
    <div className="absolute top-full z-10 border bg-white shadow-lg mt-1 w-40 rounded">
      <div className="p-2">
        {formState?.allcuisine?.map((cuisine) => ( 
          <div key={cuisine?.cuisine_id} className="flex items-center space-x-2 mb-1">
            <input
              type="checkbox"
              checked={cuisine.value} 
              onChange={(e) => handleCheckboxChange(e, cuisine)}
            />
            <label>{cuisine?.cuisine_title}</label>
          </div>
        ))}
        <hr className="my-2" />
        <label onClick={() => { SetType("Cuisine"), setShowModal(true); }}>
          Add new cuisine
        </label>
      </div>
    </div>
  )}

  {/* Cuisine Tags */}
  <div className="flex flex-wrap mt-2 space-x-2">
    {formState?.selectedCuisines?.map((cuisine) => (
      <div
        key={cuisine}
        className="px-2 py-1 bg-gray-200 rounded-full flex items-center"
      >
        {cuisine}
        <button
          className="ml-2 text-red-500"
          onClick={() => handleRemoveCuisine(cuisine)}
        >
          &times;
        </button>
      </div>
    ))}
  </div>
</div>
