import React, { useState, useEffect } from 'react';
import SearchBox from '../../../GeneralComponent/SearchBox/SearchBox';
import RestaurantService from '../../../../modules/restaurants/RestaurantService';
import search from '../../../../assets/images/prime_search.svg'
import { addNewMostLovedDishes, selectNewDish, selectApiError, selectApiLoading, getMostLovedDishes } from '../../../../redux/slices/dishes';
import { useDispatch } from 'react-redux';
const SubcategoryPopup = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [subCategories, setSubCategories] = useState([])
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    // Fetch restaurants based on search input
    useEffect(() => {
        const fetchSubCategories = async () => {
            if (searchTerm.trim() === '') {
                setSubCategories([]);
                return;
            }
            setLoading(true);
            try {
                const data = await RestaurantService.searchSubcategory(searchTerm)
                console.log("data",data);
                setSubCategories(data)
            } catch (error) {
                console.error('Error fetching subcategories:', error);
            } finally {
                setLoading(false);
            }

        }
console.log("selectedSubcategory",selectedSubcategory);

        const delayDebounce = setTimeout(fetchSubCategories, 500);
        return () => clearTimeout(delayDebounce);
    }, [searchTerm]);

    // Handle restaurant selection
    const handleSelectSubcategory = (subcategory) => {
        setSelectedSubcategory(subcategory);
        setSearchTerm('');
        setSubCategories([]); // Hide the dropdown
    };
    const handleAddDishes=async()=>{
        if(selectedSubcategory){
            await dispatch(addNewMostLovedDishes({subcategory: selectedSubcategory.subcategory_id})).unwrap();
            dispatch(getMostLovedDishes());
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-2/6">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Add Subcategory</h2>
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>

                {/* Search Box */}
                <label className='text-textLabel'>Search Sub category</label>
                <SearchBox
                    placeholder="Search for subcategory by name..."
                    img={search}
                    className="w-full h-16 my-2"
                    onSearch={(value) => setSearchTerm(value)}
                    value={searchTerm}
                />
                {/* Search Results Dropdown */}
                {loading && <p className="text-center mt-2">Loading...</p>}
                {subCategories?.length > 0 && (
                    <div className=" bg-[#FFFFFF] rounded -mt-2 max-h-60 overflow-y-auto p-2">
                    <p className='text-textThin text-sm font-SF pb-2'>{subCategories.length } Result Found</p>

                        {subCategories.map((subcategory) => (
                            <div
                                key={subcategory.subcategory_id}
                                className="flex items-center border bg-[#FFFFFF] border-gray-200 rounded-lg p-3 mb-2 shadow-sm hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleSelectSubcategory(subcategory)}
                            >
                                {/* Left: Subcategory Image */}
                                <img
                                    src={subcategory.logo || '/placeholder-image.png'}
                                    alt={subcategory.subcategory_title}
                                    className="w-16 h-16 rounded-lg object-cover mr-4"
                                />

                                {/* Right: Subcategory Details */}
                                <div className="flex-grow">
                                    <h3 className="text-lg font-semibold text-gray-800">{subcategory.subcategory_title}</h3>
                                    {/* <p className="text-sm text-gray-600">{subcategory.item_name}</p>
                                    <p className="text-sm text-gray-600">{subcategory.restaurant_name}</p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                )}


                {/* Selected Restaurants Display */}
                {selectedSubcategory  && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold mb-2">Selected Subcategory </h3>
                        
                            
                                <div
                                    key={selectedSubcategory.subcategory_id}
                                    className="flex items-center border border-gray-200 rounded-lg p-3 mb-2 shadow-sm hover:bg-gray-100 cursor-pointer"

                                >
                                    {/* Left: Subcategory Image */}
                                    <img
                                        src={selectedSubcategory.image || '/placeholder-image.png'}
                                        alt={selectedSubcategory.subcategory_title}
                                        className="w-16 h-16 rounded-lg object-cover mr-4"
                                    />

                                    {/* Right: Subcategory Details */}
                                    <div className="flex-grow">
                                        <h3 className="text-lg font-semibold text-gray-800">{selectedSubcategory.subcategory_title}</h3>
                                        {/* <p className="text-sm text-gray-600"> items:</p>
                                        <p className="text-sm text-gray-600"> restaurants:</p> */}
                                    </div>

                                </div>

                            
                        
                        <div className='flex justify-end flex-row gap-4 my-5'>
                            <button className='px-9 py-1 border-[#C0C0C0] border-[1px] bg-[#FFFFFF] text-[#464E5B] rounded-md' onClick={()=>{setSelectedSubcategory(null)}}>Clear</button>
                            <button className='px-9 py-1 border-[#2D5FDD] border-[1px] bg-[#2D5FDD] text-[#FFFFFF] rounded-md'
                            onClick={handleAddDishes}>Add</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubcategoryPopup;
