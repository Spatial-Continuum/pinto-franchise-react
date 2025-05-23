import React, { useState, useEffect } from 'react';
import { ChevronDownIcon, PencilIcon, MagnifyingGlassIcon, PhotoIcon, CheckCircleIcon, ChevronRightIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import veg from '../../assets/images/vegicon.svg';
import nonveg from '../../assets/images/nonvegicon.svg';
import recommendedicon from '../../assets/images/recommendedicon.svg';
import notrecommendedicon from '../../assets/images/notrecommendedicon.svg'
import addonpack from '../../assets/images/addonpack.svg';
import AddItem from './AddItem'
import EditItem from './EditItem';
import { Switch } from 'antd';
import AddAddOn from './AddAddOn';
import { selectSelectedRestaurant, getRestaurantById, selectApiError, selectApiLoading } from '../../redux/slices/restaurant';
import { useDispatch, useSelector } from 'react-redux';
import { deletedAddonIdApi, selectDeleteAddonData, updateAddonApi } from '../../redux/slices/addons';
import { getAllAddonApi, createAddonAPi, selectCreateAddonApiData, selectGetAllAddonApiData, } from '../../redux/slices/addons';
import { updateItemByIdApi, recommendedUpdateApi, selectRecommendedUpdate, deleteItemByIdApi, selectUpdateItemByIdApi } from '../../redux/slices/item';
import menuicon from '../../assets/images/menuicon.png';
import { getAllRecommendedItem, selectRecommendedAllItemApi } from '../../redux/slices/recommended';
import { createMenuCategoryApi, selectCreateMenuCategroy, } from '../../redux/slices/menucategory';
import EditAddOn from './EditAddOn';
import { LoadingSpinners } from '../../Elements/Spinners';
const DiningMenu = ({ restaurantId }) => {
    const [activeSubTab, setActiveSubTab] = useState("menu")
    const [openCategories, setOpenCategories] = useState([]); // Track open categories
    const [activeTab, setActiveTab] = useState("dining"); // Default is dining
    const categories = useSelector(selectSelectedRestaurant)
    console.log(categories)
    const loading = useSelector(selectApiLoading)
    const error = useSelector(selectApiError)
    const dispatch = useDispatch();
    const recommendation = useSelector(selectRecommendedAllItemApi)
    const [addonId, setAddonId] = useState(null)
    const [menuTitle, setMenuTitle] = useState("")
    const [addMenuPopup, setAddMenuPopup] = useState(false)
    const [showAddItem, setShowAddItem] = useState(false)
    const [showAddAddon, setShowAddAddon] = useState(false)
    const [showEditItem, setShowEditItem] = useState(false)
    const [refresh, setRefresh] = useState(false);
    const [recommonded, setRecommonded] = useState()
    const [deleteAddonId, setDeleteAddonId] = useState(null)
    const [deletePopup, setDeletePopup] = useState(false)
    const [showEditAddon, setShowEditAddon] = useState(false)
    const [deleteItemId, setDeleteItemId] = useState(null)
    const [editItemId, setEditItemId] = useState(null)

    const [deleteAddonPopup, setDeleteAddonPopup] = useState(false)
    const addons = useSelector(selectGetAllAddonApiData)

    // const [selectedItem, setSelectedItem] = useState([]);

    useEffect(() => {
        if (restaurantId) {
            dispatch(getRestaurantById(restaurantId))
            dispatch(getAllAddonApi(restaurantId))
            dispatch(getAllRecommendedItem(restaurantId))


        }

    }, [restaurantId, dispatch, refresh]);
    useEffect(() => {
        if (refresh && restaurantId) {
            // Fetch the latest data
            dispatch(getRestaurantById(restaurantId));
            setRefresh(false);
        }
    }, [refresh, restaurantId, dispatch]);



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

    // if (loading) return <p className="text-center text-gray-500">Loading menu...</p>;
    // if (loading) return <LoadingSpinners/>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleRecommondationToggle = (item) => {
        dispatch(recommendedUpdateApi({ itemId: item.item_id, currentStatus: item.recommended }))
            .then(() => {
                dispatch(getRestaurantById(restaurantId));
                //setRefresh(true);
            })
            .catch(error => {
                console.error("Failed to update recommendation:", error);
            })
        setRefresh(!refresh);
    };

    const handleEditAddonClick = (addonId) => {
        setAddonId(addonId.addon_id)
        setShowEditAddon(true)
        setShowAddAddon(false)
        setShowAddItem(false)
        setShowEditItem(false)
    }

    const handleSubTabClick = (subTab) => {
        setActiveSubTab(subTab);
        console.log("adons", addons)
    };
    const handleAvailabilityToggle = (item) => {
        const newAvailability = !item.is_available;
        const formPayload = new FormData();
        formPayload.append("is_available", newAvailability);

        dispatch(updateItemByIdApi({ itemId: item.item_id, formPayload }))
            .then(() => {
                // Trigger refresh after successful update
                dispatch(getRestaurantById(restaurantId));

            })
            .catch(error => {
                console.error("Failed to update availability:", error);
            });
    };
    const handleAddonAvailablityChange = (addon) => {
        const newAddonAvailablity = !addon.is_available;
        const addonData = new FormData()
        addonData.append("is_available", newAddonAvailablity);
        dispatch(updateAddonApi({ addonId: addon.addon_id, addonData }))
            .then(() => {
                dispatch(getAllAddonApi(restaurantId))
                setRefresh(true)

            })
            .catch(error => {
                console.error("Failed to update addon availability:", error);
            })

    }
    const handleEditClick = (itemid) => {
        setEditItemId(itemid)
        setShowEditItem(true)
        setShowAddAddon(false)
        setShowAddItem(false)
    };
    const handleAddClick = (restaurantId) => {
        console.log("addbutton", restaurantId)
        setShowAddItem(true)
        setShowAddAddon(false)
        setShowEditAddon(false)
        setShowEditItem(false)

    };
    const handleDelete = (itemId) => {

        setDeletePopup(true);
        setDeleteItemId(itemId);
    }
    const handleDeleteAddon = (deleteId) => {
        setDeleteAddonPopup(true);
        setDeleteAddonId(deleteId);
    }


    return (
        <div>
            <div className="h-32  mt-5 flex justify-between  bg-[#FAFAFA] border-[#D4D4D4] border-[1px] rounded-md  items-center p-4">
                {/* Left Section: Image, Restaurant Name, and Address */}
                <div className="flex   items-center w-4/6">
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
                        <p className="text-md text-gray-600">{categories.street_address_1},&nbsp;{categories.street_address_2},</p>
                        <p className="text-md text-gray-600">{categories.landmark},&nbsp;{categories.city}&nbsp;-&nbsp;{categories.pincode}</p>
                    </div>
                </div>

                {/* Right Section: Phone Number and Timings */}
                <div className="w-1/4 flex flex-col items-start justify-start">
                    {/* Phone Number */}
                    <p className="text-lg  text-gray-800 font-medium">{categories.primary_phone} &nbsp; { categories.secondary_phone && `${- categories.secondary_phone}`}</p>
                    {/* Timings */}
                    <h5 className="text-md text-gray-600">
                        ⏰ {categories.opening_hours && getCurrentDayHours(categories.opening_hours)}
                    </h5>
                </div>
            </div>



            {/* Navigation Menu */}
            {/* Navigation Menu with Progress Bar */}
            {/* <div className="relative w-full bg-gray-100 border-b border-gray-300"> */}
            <div className="flex justify-between items-center p-4">
                {/* Progress Bar - Tabs */}
                <div className="flex items-center space-x-6 relative">
                    {["dining", "recommended"].map((tab, index) => (
                        <button
                            key={tab}
                            className={`relative py-2 text-lg  ${activeTab === tab ? "text-textDarkBlue font-bold" : "text-textGray"}`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {/* Capitalizes first letter */}
                            {tab.charAt(0).toUpperCase() + tab.slice(1)} 
                            {/* Underline effect for active tab */}
                            {activeTab === tab && (
                                <div className="absolute left-0 bottom-0 w-full h-[4px] rounded-lg bg-orange-600 transition-all"></div>
                            )}
                        </button>
                    ))}
                </div>

                {/* Add Item Button */}
                {
                    activeTab === "dining" && activeSubTab === "menu" && (
                        <button
                    className="px-4 py-2 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 transition-all"
                    onClick={() => handleAddClick(restaurantId)}
                >
                    + Add Item
                </button>
                    )
                }
            </div>




            {/* in dining: menu */}
            <div className={` ${activeTab === "dining" ? "" : "hidden"}`}>
                <div className="flex flex-col lg:flex-row gap-5 mt-5 ">
                    <div className="w-full lg:w-4/6 min-h-96 bg-gray-100  border border-gray-300 rounded-lg">

                        {/* subtab navigation */}
                        <div className="flex justify-between rounded-tl-xl rounded-tr-xl items-center p-4 bg-gray-50 border-b border-gray-300">
                            <div>
                            <button
                                className={`py-2 px-4 text-md font-medium mr-4 ${activeSubTab === "menu" ? "underline-offset-8 text-[#2B2954]" : "text-[#8D8D90]"}`}
                                onClick={() => {
                                    handleSubTabClick("menu")
                                    setShowAddAddon(false)
                                                setShowEditItem(false)
                                                setShowEditAddon(false)
                                                setShowAddItem(false)
                                }}
                            >
                                Menus
                            </button>
                            <button
                                className={`py-2 px-4 text-md font-medium ${activeSubTab === "addons" ? "underline-offset-8 text-[#2B2954]" : "text-[#8D8D90]"}`}
                                onClick={() => {
                                    handleSubTabClick("addons")
                                    setShowAddItem(false)
                                }}
                            >
                                Addons
                            </button>
                            </div>
                            <button className="px-4 py-2 text-orange-500 font-medium rounded-md"
                                        onClick={() => {
                                            if(activeSubTab === "menu"){
                                                setAddMenuPopup(true)
                                                setShowAddAddon(false)
                                                setShowEditItem(false)
                                                setShowEditAddon(false)
                                                setShowAddItem(false)
                                            }else{
                                                setShowAddAddon(true)
                                                setShowEditItem(false)
                                                setShowEditAddon(false)
                                                setShowAddItem(false)
                                            }
                                            }}
                                    >
                                      + {activeSubTab == "menu" ? "ADD MENU" : "ADD"}
                                    </button>
                        </div>


                        {/* subtab  content */}
                        {activeSubTab === "menu" && (
                            <div className=''>
                                <div className="flex justify-between py-3  items-center mb-0">
                                    {/* <h1 className="text-lg font-bold px-4 text-gray-800">Menu</h1> */}



                                    <div className="bg-[#F1F5F9] py-0  px-4">
                                        <h2 className="text-[#A3A3A3]  text-md font-normal">

                                            {categories && categories.menu_categories?.length} Menu Categories</h2>
                                    </div>
                                   
                                </div>
                                {/* Category Navbar */}
                                <div className="flex flex-col bg-[#F8F8F8] mb-4  gap-2">
                                    {categories && categories.menu_categories?.map((category) => (
                                        <div key={category.menu_category_id} className=''>
                                            {/* Category Button */}
                                            <div className="text-md text-start px-4 bg-[#FFFFFF] font-normal  py-3 justify-between text-black rounded-md flex items-center">
                                                <div className="flex cursor-pointer flex-row items-center"
                                                    onClick={() => handleCategoryClick(category.menu_category_id)}>
                                                    <div className='bg-[#FFDCD0] rounded-full mr-3'>
                                                        <img src={menuicon} className='text-xl w-7 h-7 p-1 ' />
                                                    </div>
                                                    <div className='cursor-pointer'

                                                    >
                                                        {category.menu_title}

                                                    </div>
                                                    {/* Dropdown Arrow */}
                                                    <div  >
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
                                                                        onClick={() => {
                                                                            setEditItemId(item.item_id)
                                                                            setShowEditItem(true)
                                                                        }

                                                                        }
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
                                                                        onChange={() => handleAvailabilityToggle(item)} // Optionally, disable the switch if needed
                                                                    />
                                                                    <img
                                                                        src={item.recommended ? recommendedicon : notrecommendedicon}
                                                                        alt="Recommended Icon"
                                                                        className="h-4 w-4 cursor-pointer"
                                                                        onClick={() => handleRecommondationToggle(item)}
                                                                    />
                                                                    {item.addons.length > 0 ? (
                                                                        <img
                                                                            src={addonpack}
                                                                            alt="Addon Pack Icon"
                                                                            className="h-4 w-4"
                                                                        />
                                                                    ) : (
                                                                        <div className="h-4 w-4"></div> // Empty space
                                                                    )}
                                                                    <PencilIcon
                                                                        className="h-4 w-7   text-gray-500 hover:text-blue-700 cursor-pointer"
                                                                        title="Edit"
                                                                        onClick={() => {
                                                                            handleEditClick(item.item_id)

                                                                        }}
                                                                    />

                                                                    <TrashIcon
                                                                        className="h-4 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                                                                        title="Delete"
                                                                        onClick={() => handleDelete(item.item_id)}
                                                                    />

                                                                </div>
                                                            </ul>
                                                        ))}
                                                        <p className="mb-2 ml-20 text-xs font-bold text-green-700 cursor-pointer"
                                                            onClick={() => handleAddClick(restaurantId)}>
                                                             Add new item
                                                        </p>
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                        )}
                        {/* menu category popup */}

                        {addMenuPopup && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
                                    {/* Header with Title and Close Button */}
                                    <button type='button' onClick={() => {
                                        console.log("click");
                                        setAddMenuPopup(false)
                                    }}

                                        className="z-50 absolute cursor-pointer top-3 h-10 right-5 text-gray-500 text-4xl hover:text-gray-700">
                                        <span> &times;</span>
                                    </button>
                                    <div className="flex items-center border-b pb-3 relative">
                                        <h2 className="text-lg font-semibold text-gray-800">Add New Menu</h2>

                                    </div>

                                    {/* Input Field */}
                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                                            placeholder="Enter category title"
                                            value={menuTitle}
                                            onChange={(e) => setMenuTitle(e.target.value)}
                                        />
                                    </div>

                                    {/* Buttons (Cancel & Done) */}
                                    <div className="flex justify-end mt-6 space-x-3">
                                        <button
                                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100"
                                            onClick={() => setAddMenuPopup(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                                            onClick={() => {
                                                const categoryData = {
                                                    restaurant: restaurantId,
                                                    menu_title: menuTitle,
                                                };
                                                dispatch(createMenuCategoryApi(categoryData));
                                                setAddMenuPopup(false); // Close the popup after dispatching
                                                setMenuTitle("");
                                                setRefresh(!refresh)

                                            }}>
                                            Done
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                        {
                            deletePopup && (
                                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                    <div className="bg-white w-94 rounded-lg shadow-lg flex justify-center items-center flex-col p-6 relative">
                                        <h3>Are you sure want to delete ?</h3>
                                        <div className='flex justify-end gap-4 mt-3'>
                                            <button className="px-4 py-1 border-[#4A4E56] border-[1px] bg-[#ADADAD24] rounded-lg cursor-pointer text-[#4A4E56]" onClick={() => setDeletePopup(false)}>Cancel</button>
                                            <button className="px-4 py-1 border-[#FF0000] border-[1px] bg-[#FF0000] rounded-lg cursor-pointer text-[#FFFFFF]" onClick={() => {
                                                dispatch(deleteItemByIdApi(deleteItemId))
                                                    .then(() => {
                                                        console.log("Item deleted successfully");
                                                        setDeletePopup(false);
                                                        setRefresh(true);
                                                        // Optionally refresh the data or perform other actions
                                                    })
                                                    .catch(error => {
                                                        console.error("Failed to delete item:", error);
                                                        setDeletePopup(false);
                                                    });
                                            }}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                        {deleteAddonPopup && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white w-94 rounded-lg shadow-lg flex justify-center items-center  flex-col p-6 relative">
                                    <h3>Are you sure want to delete ?</h3>
                                    <div className='flex justify-end gap-4 mt-3'>
                                        <button className="px-4 py-1 border-[#4A4E56] border-[1px] bg-[#ADADAD24] rounded-lg cursor-pointer text-[#4A4E56]" onClick={() => setDeleteAddonPopup(false)}>Cancel</button>
                                        <button className="px-4 py-1 border-[#FF0000] border-[1px] bg-[#FF0000] rounded-lg cursor-pointer text-[#FFFFFF]" onClick={() => {
                                            dispatch(deletedAddonIdApi(deleteAddonId))
                                                .then(() => {
                                                    console.log("Item deleted successfully");
                                                    dispatch(getAllAddonApi(restaurantId))
                                                    setDeleteAddonPopup(false);
                                                    setRefresh(true);
                                                    // Optionally refresh the data or perform other actions
                                                })
                                                .catch(error => {
                                                    console.error("Failed to delete item:", error);
                                                    setDeletePopup(false);
                                                });
                                        }}>Delete</button>
                                    </div>
                                </div>
                            </div>

                        )}



                        {activeSubTab === "addons" && (
                            <div className="">
                                {/* <h1 className="text-lg font-bold mb-4 text-gray-800">Add-ons</h1> */}
                                <div className="flex justify-between py-3  items-center mb-0">

                                    <div className="bg-[#F1F5F9] py-0  px-4">
                                        <h2 className="text-[#A3A3A3]  text-md font-normal">

                                            {addons?.length} Addons</h2>
                                    </div>
                                    {/* <button className="px-4 py-2 text-orange-500 font-medium rounded-md"
                                        onClick={() => {
                                            setShowAddAddon(true)
                                            setShowEditItem(false)
                                            setShowEditAddon(false)
                                            setShowAddItem(false)
                                        }

                                        }
                                    >
                                        + Add Addon
                                    </button> */}
                                </div>
                                <div className="flex flex-col bg-[#FFFFFF] gap-4 pt-5">
                                    {addons?.map((addon) => (
                                        <div
                                            key={addon.id}
                                            className="flex  bg-[#FFFFFF]  px-4  rounded-lg "
                                        >

                                            <div className='grid grid-cols-2 justify-between w-full  '>
                                                <div className='flex ml-2'>
                                                    <img
                                                        src={addon.image}
                                                        className='w-8 h-8 object-cover rounded-full mr-4'
                                                        alt={addon.addon_name}
                                                    />
                                                    <div className="font-normal flex items-center gap-6 text-slate-700">
                                                        <strong>{addon.addon_name}</strong>
                                                        <p className='flex gap-3'> {addon.item_type === "Veg" ? (
                                                            <img src={veg} alt="Veg" style={{ width: "20px", height: "20px" }} />
                                                        ) : addon.item_type === "Non-Veg" ? (
                                                            <img src={nonveg} alt="Non-Veg" style={{ width: "20px", height: "20px" }} />
                                                        ) : null} {addon.item_type}</p>

                                                    </div>
                                                </div>
                                                <div className='flex justify-end gap-20 mr-8  '>
                                                    <p className='text-black font-medium'>₹{addon.selling_price}</p>
                                                    <Switch
                                                        size="small"
                                                        checked={addon.is_available}

                                                        onChange={() => handleAddonAvailablityChange(addon.is_available)}
                                                    />
                                                    <PencilIcon
                                                        className="h-4 w-7   text-green-500 hover:text-green-700 cursor-pointer"
                                                        title="Edit"
                                                        onClick={() => handleEditAddonClick(addon)}
                                                    //onClick={() => handleAddClick(restaurantId)}>
                                                    />
                                                    <TrashIcon
                                                        className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
                                                        title="Delete"
                                                        onClick={() => handleDeleteAddon(addon.addon_id)}
                                                    />

                                                </div>

                                            </div>
                                        </div>
                                    ))}
                                    <div onClick={()=>{
                                         setShowAddAddon(true)
                                                setShowEditItem(false)
                                                setShowEditAddon(false)
                                                setShowAddItem(false)
                                    }}>
                                        <p className="text-xs font-bold px-4 py-2 bg-[#FFFFFF] text-green-700  cursor-pointer">Add new add-on</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='w-full lg:w-2/6'>
                        {showAddItem && <AddItem restaurantId={restaurantId} setAddMenuPopup={setAddMenuPopup} setRefresh={setRefresh} setShowAddItem={setShowAddItem} />}
                        {showEditItem && <EditItem itemId={editItemId} restaurantId={restaurantId} setShowEditItem={setShowEditItem} />}
                        {showAddAddon && <AddAddOn setShowAddAddon={setShowAddAddon} restaurantId={restaurantId} setRefresh={setRefresh} />}
                        {showEditAddon && <EditAddOn setShowEditAddon={setShowEditAddon} addonId={addonId} restaurantId={restaurantId} setRefresh={setRefresh} />}
                    </div>
                </div>
            </div>
            {/* </div> */}

            {/* Charges tab*/}
            <div className={`p-4 ${activeTab === "charges" ? "" : "hidden"}`}>
                {/* The content for Charges tab */}
                <div className="flex flex-col lg:flex-row gap-5 mt-5 ">
                    <div className="w-full lg:w-4/6 bg-gray-100  border border-gray-300 rounded-lg">
                        <div className="flex justify-between py-3  bg-[#FFFFFF] items-center mb-0">
                            <h1 className="text-lg font-bold  px-4 text-gray-800">Packaging Charge</h1>
                        </div>

                        <div className="flex flex-col bg-[#FFFFFF] gap-4 pt-5 ">
                            <div className='bg-[#F1F5F9] py-4 pl-5'><h3>APPLIED</h3></div>
                            <div className="flex items-center flex-row   gap-4 pl-5">

                                <h2>Packaging charge</h2>
                                <div className='flex flex-row w-14 py-2 mb-2 rounded-md  border-[1px] border-[#C9C9C9]'>
                                    <h2>Rs:</h2>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border-none"
                                        placeholder=""
                                    // value={packagingCharge}

                                    />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


            {/* recommendedTab */}
            <div className={`p-4 ${activeTab === "recommended" ? "" : "hidden"}`}>
                {/* The content for Charges tab */}
                <div className="flex w-4/6  gap-5 bg-[#FFFFFF] mt-5 rounded-lg ">
                    <div className="w-full lg:w-full  flex flex-col border border-gray-300 rounded-lg">
                        <div className="flex justify-between py-4  items-center">
                            <h1 className="text-lg font-bold px-4 text-gray-800">Recommended Menu</h1>

                        </div>
                        <div className='flex px-4 py-3 bg-[#F1F5F9] items-center  justify-between '>
                            <h1 className="text-md font-semibold  text-[#A3A3A3]">{recommendation.length} ITEMS</h1>
                        </div>
                        {recommendation && recommendation.length > 0 ? (
                            <div className="flex flex-col px-4 py-3 bg-white">
                                {recommendation.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center justify-between w-full py-3 border-gray-200"
                                    >
                                        {/* Left Section: Image, Name, Type */}
                                        <div className="flex items-center gap-5">
                                            {/* Item Image */}
                                            <img
                                                src={item.image}
                                                alt={item.item_name}
                                                className="w-8 h-8 object-cover rounded-full"
                                            />

                                            {/* Item Name & Type */}
                                            <div className="flex items-center gap-3 text-slate-700">
                                                <strong className="text-gray-800">{item.item_name}</strong>

                                                {/* Item Type */}
                                                <div className="flex items-center gap-2">
                                                    {item.item_type === "Veg" ? (
                                                        <img src={veg} alt="Veg" className="w-5 h-5" />
                                                    ) : item.item_type === "Non-Veg" ? (
                                                        <img src={nonveg} alt="Non-Veg" className="w-5 h-5" />
                                                    ) : null}
                                                    <span className="text-gray-600">{item.item_type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Section: Price & Remove Button */}
                                        <div className="grid grid-cols-2 gap-36 items-center ">
                                            <p className="text-black font-medium">₹{item.selling_price}</p>
                                            <button className="px-2 py-0  border-[0.5px] border-[#FF2323] text-[#FF2323] rounded-lg cursor-pointer hover:bg-red-100 transition"
                                            onClick={()=>handleRecommondationToggle(item)}>
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 px-4 py-3">No recommended items available</p>
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiningMenu;
