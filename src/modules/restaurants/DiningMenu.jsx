import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, PencilIcon, MagnifyingGlassIcon, PhotoIcon, CheckCircleIcon, ChevronRightIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import veg from '../../assets/images/vegicon.svg';
import nonveg from '../../assets/images/nonvegicon.svg';
import AddItem from './AddItem'
import EditItem from './EditItem';
import { Switch } from 'antd';
import AddAddOn from './AddAddOn';
import { selectSelectedRestaurant, getRestaurantById, selectApiError, selectApiLoading } from '../../redux/slices/restaurant';
import { useDispatch, useSelector } from 'react-redux';
const DiningMenu = ({ restaurantId }) => {
    const [activeSubTab, setActiveSubTab] = useState("menu")
    const [openCategories, setOpenCategories] = useState([]); // Track open categories
    const [activeTab, setActiveTab] = useState("dining"); // Default is dining
    const categories = useSelector(selectSelectedRestaurant)
    console.log(categories)
    const loading = useSelector(selectApiLoading)
    const error = useSelector(selectApiError)
    const dispatch = useDispatch();
    const [showAddItem, setShowAddItem] = useState(false)
    const [showEditItem, setShowEditItem] = useState(false)
    const [editItemId, setEditItemId] = useState("")
    // const [selectedItem, setSelectedItem] = useState([]);
    const [addons, setAddons] = useState([
        { id: 1, name: "Extra Cheese", price: 30 },
        { id: 2, name: "Bacon Bits", price: 50 },
    ]);
    useEffect(() => {
        if (restaurantId) {
            dispatch(getRestaurantById(restaurantId))
        }

    }, [restaurantId, dispatch]);



    const handleCategoryClick = (categoryId) => {
        setOpenCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };
    const getCurrentDayHours = (openingHours) => {
        const daysOfWeek = [

            "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"



        ];
        const currentDay = new Date().getDay();
        const currentDayName = daysOfWeek[currentDay];
        const CurrentDayHours = openingHours[currentDayName] || "Hours not available";
        return `${currentDayName}: ${CurrentDayHours}`;
    };

    if (loading) return <p className="text-center text-gray-500">Loading menu...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSubTabClick = (subTab) => {
        setActiveSubTab(subTab);
    };

    // const numMenuCategories = categories.menu_categories.length;
    const handleEditClick = (itemid) => {
        setEditItemId(itemid)
        setShowEditItem(true)
    };
    const handleAddClick = (restaurantId) => {
        console.log("addbutton", restaurantId)
        setShowAddItem(true)

    };


    return (
        <div>
            <div className="h-32  mt-5 flex  bg-[#FAFAFA] border-[#D4D4D4] border-[1px] rounded-md  items-center p-4">
                {/* Left Section: Image, Restaurant Name, and Address */}
                <div className="flex   items-center w-3/4">
                    <div className='flex justify-center items-center'>
                        <img
                            src={categories.image}
                            alt="Restaurant"
                            className="w-20 h-20 object-cover rounded-md  mr-6 "
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        {/* Restaurant Name */}
                        <h3 className="font-semibold text-xl text-gray-800">{categories.name}</h3>
                        {/* Address */}
                        <p className="text-md text-gray-600">{categories.street_address_1}{categories.street_address_2}</p>
                    </div>
                </div>

                {/* Right Section: Phone Number and Timings */}
                <div className="w-1/4 flex flex-col items-center justify-center">
                    {/* Phone Number */}
                    <p className="text-lg  text-gray-800 font-medium">{categories.contact_number}</p>
                    {/* Timings */}
                    <h5 className="text-md text-gray-600">
                        ⏰ {categories.opening_hours && getCurrentDayHours(categories.opening_hours)}
                    </h5>
                </div>
            </div>



            {/* Navigation Menu */}

            <div className={` ${activeTab === "dining" ? "" : "hidden"}`}>
                <div className="flex justify-between items-center p-4 bg-gray-100 border-b border-gray-300">
                    <div className="flex items-center  space-x-4">
                        <button
                            className={` py-2  text-lg font-medium ${activeTab === "dining" ? "  underline" : "text-black-700"}`}
                            onClick={() => handleTabClick("dining")}
                        >
                            Dining Menu
                        </button>
                        <button
                            className={`px-4 py-2 text-lg font-medium ${activeTab === "charges" ? " text-orange-600 underline" : "text-black-700"}`}
                            onClick={() => handleTabClick("charges")}
                        >
                            Charges
                        </button>
                        <button
                            className={`px-4 py-2 text-lg font-medium ${activeTab === "recommended" ? "text-orange-600 underline" : "text-black-700"}`}
                            onClick={() => handleTabClick("recommended")}
                        >
                            Recommended
                        </button>

                    </div>
                    <button className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-blue-600"
                        onClick={() => handleAddClick(restaurantId)}>
                        + Add Item
                    </button>
                </div>


                {/* in dining: menu */}


                <div className="flex flex-col lg:flex-row gap-5 mt-5 ">
                    <div className="w-full lg:w-3/5 bg-gray-100  border border-gray-300 rounded-lg">

                        {/* subtab navigation */}
                        <div className="flex justify-start items-center p-4 bg-gray-50 border-b border-gray-300">
                            <button
                                className={`py-2 px-4 text-md font-medium mr-4 ${activeSubTab === "menu" ? "underline text-orange-600" : "text-gray-700"}`}
                                onClick={() => handleSubTabClick("menu")}
                            >
                                Menu
                            </button>
                            <button
                                className={`py-2 px-4 text-md font-medium ${activeSubTab === "addons" ? "underline text-orange-600" : "text-gray-700"}`}
                                onClick={() => handleSubTabClick("addons")}
                            >
                                Add-ons
                            </button>
                        </div>


                        {/* subtab  content */}
                        {activeSubTab === "menu" && (
                            <div className=''>
                                <div className="flex justify-between items-center mb-4">
                                    <h1 className="text-lg font-bold px-4 text-gray-800">Menu</h1>
                                    <button className="px-4 py-2 text-orange-500 font-medium rounded-md">
                                        + Add Category
                                    </button>
                                </div>

                                <div className="bg-[#F1F5F9] py-2  px-4">
                                    <h2 className="text-[#A3A3A3] px-4 text-md font-normal">

                                        {categories && categories.menu_categories?.length} Categories</h2>
                                </div>

                                {/* Category Navbar */}
                                <div className="flex flex-col bg-[#F8F8F8] mb-4  gap-2">
                                    {categories && categories.menu_categories?.map((category) => (
                                        <div key={category.menu_category_id} className=''>
                                            {/* Category Button */}
                                            <div className="text-md text-start px-4 bg-[#FFFFFF] font-normal  py-3 justify-between text-black rounded-md flex items-center">
                                                <div className="flex cursor-pointer flex-row items-center">
                                                    <div className='cursor-pointer'
                                                        onClick={() => handleCategoryClick(category.menu_category_id)}
                                                    >
                                                        {category.menu_title}

                                                    </div>
                                                    {/* Dropdown Arrow */}
                                                    <div>
                                                        <ChevronDownIcon
                                                            className={`h-3 w-3 mt-1 ml-4 transition-transform duration-200 ${openCategories.includes(category.menu_category_id)
                                                                ? 'rotate-180'
                                                                : ''
                                                                }`}
                                                        />
                                                    </div>
                                                </div>
                                                <p className='font-normal text-[#A3A3A3]'>{openCategories && category.menu_category_id && category.items.length} items</p>
                                            </div>

                                            {/* Display items below the selected category */}
                                            {openCategories.includes(category.menu_category_id) && (
                                                <div className="pl-8 py-3">
                                                    <ul className="list-disc">
                                                        {category.items.map((item) => (
                                                            <ul
                                                                key={item.item_id}
                                                                className="mb-2 ml-10 text-sm flex justify-between"
                                                            >
                                                                <div className='flex '>
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.item_name}
                                                                        className="w-8 h-8  object-cover rounded-full mr-4"
                                                                    />
                                                                    <div className="font-normal flex items-center gap-6 text-slate-700">
                                                                        <strong>{item.item_name}</strong>
                                                                        <p className='flex gap-3'> {item.item_type === "Veg" ? (
                                                                            <img src={veg} alt="Veg" style={{ width: "20px", height: "20px" }} />
                                                                        ) : item.item_type === "Non-Veg" ? (
                                                                            <img src={nonveg} alt="Non-Veg" style={{ width: "20px", height: "20px" }} />
                                                                        ) : null} {item.item_type}</p>
                                                                        <p className='text-black font-medium'>₹{item.selling_price}</p>


                                                                    </div>
                                                                </div>
                                                                <div className="flex items-center mr-16 gap-12">
                                                                    <Switch
                                                                        size="small"
                                                                        checked={item.is_available} // Switch is ON if item is available (item_unavailable is false)
                                                                        disabled={false} // Optionally, disable the switch if needed
                                                                    />
                                                                    <PencilIcon
                                                                        className="h-4 w-7   text-gray-500 hover:text-blue-700 cursor-pointer"
                                                                        title="Edit"
                                                                        onClick={() => handleEditClick(item.item_id)}
                                                                    />
                                                                    <EyeIcon
                                                                        className="h-4 w-5 text-gray-500 hover:text-green-700 cursor-pointer"

                                                                        title="View"
                                                                    />
                                                                    <TrashIcon
                                                                        className="h-4 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                                                                        title="Delete"
                                                                    />
                                                                </div>
                                                            </ul>
                                                        ))}
                                                        <p className="mb-2 ml-10 text-xs font-bold text-green-700 cursor-pointer"

                                                            onClick={() => handleAddClick(restaurantId)}>
                                                            + Add new item
                                                        </p>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        )}
                        {activeSubTab === "addons" && (
                            <div className="p-4">
                                <h1 className="text-lg font-bold mb-4 text-gray-800">Add-ons</h1>
                                <div className="flex flex-col gap-4">
                                    {addons.map((addon) => (
                                        <div
                                            key={addon.id}
                                            className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg"
                                        >
                                            <div className="text-gray-700">
                                                <p className="font-medium">{addon.name}</p>
                                                <p className="text-sm text-gray-500">₹{addon.price}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <PencilIcon
                                                    className="h-4 w-5 text-gray-500 hover:text-blue-700 cursor-pointer"
                                                    title="Edit"
                                                />
                                                <TrashIcon
                                                    className="h-4 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                                                    title="Delete"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                    <p className="text-xs font-semibold text-orange-400 cursor-pointer">+ Add new add-on</p>
                                </div>
                            </div>
                        )}
                    </div>


                    {showAddItem && <AddItem restaurantId={restaurantId} setShowAddItem={setShowAddItem} />}
                    {showEditItem && <EditItem item={editItemId} setShowEditItem={setShowEditItem} />}

                </div>
            </div>

            {/* Charges tab*/}
            <div className={`p-4 ${activeTab === "charges" ? "" : "hidden"}`}>
                {/* The content for Charges tab */}
                <div className="text-gray-500 text-center">
                    <p>No content available for Charges</p>
                </div>
            </div>

            {/* recommendedTab */}
            <div className={`p-4 ${activeTab === "recommended" ? "" : "hidden"}`}>
                {/* The content for Charges tab */}
                <div className="text-gray-500 text-center">
                    <p>No content available for Charges</p>
                </div>
            </div>
        </div>
    );
};

export default DiningMenu;
