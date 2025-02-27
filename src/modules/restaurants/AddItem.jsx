import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ChevronRightIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import RestaurantService from "./RestaurantService";
import upload from "../../assets/images/Upload.svg";
import veg from "../../assets/images/vegicon.svg";
import nonveg from "../../assets/images/nonvegicon.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAddonApi,
  selectGetAllAddonApiData,
  selectApiError,
  selectApiLoading,
} from "../../redux/slices/addons";
import {
  selectSelectedRestaurant,
  getRestaurantById,
} from "../../redux/slices/restaurant";
import { createItemApi } from "../../redux/slices/item";

const AddItem = ({
  restaurantId,
  setShowAddItem,
  setRefresh,
  setAddMenuPopup,
}) => {
  const dispatch = useDispatch();
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const addons = useSelector(selectGetAllAddonApiData);
  const selectedRestaurant = useSelector(selectSelectedRestaurant);
  const [errors, setErrors] = useState({});
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  const [commissionPercentage, setCommissionPercentage] = useState(null);
  const [itemImage, setItemImage] = useState(null);
  const [refresh1, setRefresh1] = useState(false);
  const [previewItemImage, setPreviewItemImage] = useState(null);
  const [foodType, setFoodType] = useState(""); // Stores the selected food type
  const [subCategoryTitle, setSubCategoryTitle] = useState("");
  const [formData, setFormData] = useState({
    itemName: "",
    menuCategory: "",
    subCategory: "",
    itemDescription: "",
    basePrice: "",
    prepTime: "",
    quantity: "",
    mealType: "",
    commission: "",
    selectedAddons: [],
    // addonChecked: '',
    addonChecked: false,
    showAddonDropdown: false,
    addons: [],
  });

  useEffect(() => {
    dispatch(getAllAddonApi(restaurantId));
    if (selectedRestaurant && selectedRestaurant.commission_percentage) {
      setCommissionPercentage(selectedRestaurant.commission_percentage);
    }
    const fetchCategories = async () => {
      try {
        if (restaurantId) {
          const categoriesData = await RestaurantService.getMenuCategory(
            restaurantId
          );
          setCategories(categoriesData); // Assuming categoriesData is an array
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    if (restaurantId) {
      fetchCategories();
    }
  }, [dispatch, refresh1, restaurantId]);

  const basePrices = formData.basePrice;

  let sellingPrice = parseInt(
    parseFloat(basePrices) +
      parseFloat(basePrices * (commissionPercentage / 100))
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "addNewMenu") {
      setAddMenuPopup(true);
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveAddon = (addonId) => {
    setFormData({
      ...formData,
      selectedAddons: formData.selectedAddons.filter((id) => id !== addonId),
    });
  };
  const handleFoodTypeSelect = (type) => {
    setFoodType(type);
    setErrors((prev) => ({ ...prev, foodType: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const basePrice = parseFloat(formData.basePrice, 10); // Convert base price to integer
    const SellingPrice = parseFloat(sellingPrice, 10);
    const Quantity = parseFloat(formData.quantity, 10);

    let newErrors = {};
    if (!formData.itemName.trim()) newErrors.itemName = "Item Name is required";
    if (!formData.menuCategory.trim())
      newErrors.menuCategory = "Menu Category is required";
    if (!formData.subCategory.trim())
      newErrors.subCategory = "Subcategory is required";
    if (!formData.itemDescription.trim())
      newErrors.itemDescription = "Description is required";
    if (!basePrice) newErrors.basePrice = "Base Price is required";
    if (!formData.prepTime.trim())
      newErrors.prepTime = "Preparation Time is required";
    if (!Quantity) newErrors.quantity = " is required";
    if (!foodType.trim()) newErrors.foodType = "Please select Food Type";
    if (!itemImage) newErrors.itemImage = "Please upload an Item Image";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // ✅ No errors, proceed with submission
    setErrors({}); // Clear errors when form is valid
    console.log("Form data on submit:", formData);

    const postData = new FormData(); // Create FormData to handle both text and file uploads

    // Append text data
    postData.append("item_name", formData.itemName);
    postData.append("restaurant_id", restaurantId);
    postData.append("item_type", foodType); // Append selected food type ('Veg' or 'Non-Veg')
    postData.append("description", formData.itemDescription);
    postData.append("base_price", basePrice);
    postData.append("preparation_time", formData.prepTime);
    postData.append("quantity", Quantity); // Default quantity (adjust as needed)
    postData.append("is_available", true); // Default availability (adjust if necessary)
    postData.append("selling_price", SellingPrice);
    // postData.append('addons',[]);

    // Append menu category and subcategory IDs
    postData.append("menu_category_id", formData.menuCategory);
    postData.append("subcategory_id", formData.subCategory);
    if (formData.selectedAddons.length > 0) {
      formData.selectedAddons.forEach((addonId) => {
        postData.append("addon_ids", addonId); // Most API formats
      });
    }

    // Append item image if present
    if (itemImage) {
      postData.append("image", itemImage);
    } else {
      console.log("No image selected");
    }
    for (let [key, value] of postData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log("posting data id", postData);

    try {
      await dispatch(createItemApi(postData)).unwrap();
      setRefresh1(!refresh1);
      setRefresh(true);
      setShowAddItem(false);
    } catch (error) {
      console.error("Item creation failed:", error);
    }
  };

  const handleImageFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItemImage(file);
        setPreviewItemImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageData(null);
      setPreviewItemImage(null);
      setErrors((prevErrors) => ({ ...prevErrors, itemImage: "" }));
    }
  };

  const handleSubcategorySearch = async (e) => {
    try {
      setSubCategoryTitle(e);
      if (e.trim() === "") {
        setSubcategories([]); // Clear dropdown if input is empty
        return;
      }
      const response = await RestaurantService.searchSubcategory(e);
      setSubcategories(response);
    } catch (error) {
      console.error("Error searching subcategories:", error);
    }
  };
  const handleCheckboxChange = (addonId) => {
    setFormData((prev) => {
      const isSelected = prev.selectedAddons.includes(addonId);
      return {
        ...prev,
        selectedAddons: isSelected
          ? prev.selectedAddons.filter((id) => id !== addonId)
          : [...prev.selectedAddons, addonId],
      };
    });
  };
  const handleClose = () => {
    setShowAddItem(false);
  };

  return (
    <div>
      <div className="w-full p-6 bg-gray-100 border border-gray-300 rounded-lg">
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-800 text-start">+ Add item</p>
          <div className="flex flex-row gap-2">
            <button
              className="px-5 py-2 font-medium text-black bg-white rounded-md hover:border-grey-700"
              onClick={handleClose}
            >
              cancel
            </button>
            <button
              className="px-5 py-2 font-medium text-white bg-blue-500 rounded-md hover:bg-blue-700"
              onClick={handleSubmit}
            >
              Publish
            </button>
          </div>
        </div>

        <hr className="my-4 border-gray-300" />
        <div className="mb-36">
          <form className="space-y-4">
            {/* Item Name and Menu Category */}
            <div className="flex items-center space-x-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="itemName"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Item Name
                </label>
                <input
                  id="itemName"
                  name="itemName"
                  type="text"
                  placeholder="Enter item name"
                  value={formData.itemName}
                  onChange={handleChange}
                  //className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  className={`px-3 py-2 border ${
                    errors.itemName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.itemName && (
                  <p className="mt-1 text-xs text-red-500">{errors.itemName}</p>
                )}
              </div>

              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="menuCategory"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Menu Category
                </label>
                <select
                  id="menuCategory"
                  name="menuCategory"
                  value={formData.menuCategory}
                  onChange={handleChange}
                  className={`px-3 py-2 border ${
                    errors.menuCategory ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option className="cursor-pointer" value="">
                    Select category
                  </option>
                  {categories.map((category) => (
                    <option
                      key={category.menu_category_id}
                      value={category.menu_category_id}
                    >
                      {category.menu_title}
                    </option>
                  ))}
                  <option
                    className="text-[#014E8D] cursor-pointer p-3 mt-2"
                    value="addNewMenu"
                  >
                    Add a New Menu
                  </option>
                </select>
                {errors.menuCategory && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.menuCategory}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Subcategory Search */}
              {/* Subcategory Search */}
              <div className="relative flex flex-col">
                <label
                  htmlFor="subCategory"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Subcategory
                </label>
                {/* Input field for searching subcategories */}
                <input
                  type="text"
                  id="subCategory"
                  name="subCategory"
                  value={subCategoryTitle}
                  placeholder="Search subcategory"
                  onChange={(e) => handleSubcategorySearch(e.target.value)}
                  onBlur={() => {
                    if (
                      dropdownRef.current &&
                      !dropdownRef.current.contains(e.relatedTarget)
                    ) {
                      setTimeout(() => setSubcategories([]), 50);
                    }
                  }} // Clear dropdown after input loses focus
                  className={`px-3 py-2 border ${
                    errors.itemName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.subCategory && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.subCategory}
                  </p>
                )}
                {/* Dropdown list for search results */}
                {subcategories.length > 0 && (
                  <ul className="absolute left-0 z-50 w-full overflow-y-auto bg-white border border-gray-300 rounded-md top-full max-h-40">
                    {subcategories.map((sub) => (
                      <li
                        key={sub.subcategory_id}
                        onClick={() => {
                          setFormData({
                            ...formData,
                            subCategory: sub.subcategory_id,
                          }); // Set selected subcategory
                          setSubCategoryTitle(sub.subcategory_title);
                          setSubcategories([]); // Clear dropdown after selection
                        }}
                        className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      >
                        {sub.subcategory_title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              {/* mealtype */}
              {/* <div className="flex flex-col w-1/2">
                                <label htmlFor="mealType" className="mb-1 text-sm text-gray-700 font-xs">
                                    Meal Type
                                </label>
                                <select
                                    id="mealType"
                                    name="mealType"
                                    value={formData.mealType}
                                    onChange={handleChange}
                                    className="px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Meal Type</option>
                                    <option value="Dinner">Dinner</option>
                                    <option value="Lunch">Lunch</option>
                                    <option value="Breakfast">Breakfast</option>
                                </select>
                            </div> */}
            </div>

            {/* Food Type */}
            <div>
              <label className="mb-1 text-sm text-gray-700 font-xs">
                Food Type
              </label>
              <div className="flex gap-4 mt-2">
                <div
                  //  className={`flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer ${foodType === 'Veg' ? 'bg-green-100' : ''}`}
                  className={`flex items-center gap-2 px-4 py-2 border ${
                    errors.foodType ? "border-red-500" : "border-gray-300"
                  } rounded-md cursor-pointer ${
                    foodType === "Veg" ? "bg-green-100" : ""
                  }`}
                  onClick={() => handleFoodTypeSelect("Veg")}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full">
                    <img src={veg} className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Veg</span>
                </div>

                <div
                  className={`flex items-center gap-2 px-4 py-2 border ${
                    errors.foodType ? "border-red-500" : "border-gray-300"
                  } rounded-md cursor-pointer ${
                    foodType === "Non-Veg" ? "bg-red-100" : ""
                  }`}
                  onClick={() => handleFoodTypeSelect("Non-Veg")}
                >
                  <div className="flex items-center justify-center w-5 h-5">
                    <img src={nonveg} className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    Non-Veg
                  </span>
                </div>
              </div>

              {errors.foodType && (
                <p className="mt-1 text-xs text-red-500">{errors.foodType}</p>
              )}
            </div>

            {/* Item Description */}
            <div className="flex flex-col">
              <label
                htmlFor="itemDescription"
                className="mb-1 text-sm text-gray-700 font-xs"
              >
                Item Description
              </label>
              <textarea
                id="itemDescription"
                name="itemDescription"
                rows="4"
                placeholder="Enter item description"
                value={formData.itemDescription}
                onChange={handleChange}
                className={`px-3 py-2 border ${
                  errors.itemDescription ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.itemDescription && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.itemDescription}
                </p>
              )}
            </div>
            {/* Base Price, Commission, and Selling Price */}

            {/* Base Price and Preparation Time */}
            <div className="flex items-center space-x-6">
              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="basePrice"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Base Price
                </label>

                <input
                  id="input-floating"
                  step="0.01"
                  name="basePrice"
                  type="number"
                  placeholder="Enter price in num"
                  value={formData.basePrice}
                  onChange={handleChange}
                  // className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"

                  className={`px-3 py-2 border ${
                    errors.itemName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.basePrice && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.basePrice}
                  </p>
                )}
              </div>

              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="commission"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Commission
                </label>

                <div className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-sm text-gray-700">
                    {commissionPercentage} %
                  </span>
                </div>
              </div>

              <div className="flex flex-col w-1/3">
                <label
                  htmlFor="sellingPrice"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Selling Price
                </label>
                <div className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <span className="text-sm text-gray-700">{sellingPrice}</span>
                </div>
              </div>
            </div>

            {/* Quantity and Preparation Time */}
            <div className="flex items-center space-x-4 ">
              <div className="flex flex-col w-1/4">
                <label
                  htmlFor="quantity"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  placeholder="Enter count"
                  onChange={handleChange}
                  //className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  className={`px-3 py-2 border ${
                    errors.itemName ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.quantity && (
                  <p className="mt-1 text-xs text-red-500">{errors.quantity}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="prepTime"
                  className="mb-1 text-sm text-gray-700 font-xs"
                >
                  Preparation Time
                </label>
                <input
                  id="prepTime"
                  name="prepTime"
                  type="num"
                  placeholder="minutes"
                  value={formData.prepTime}
                  onChange={handleChange}
                  // className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  className={`px-3 py-2 border ${
                    errors.prepTime ? "border-red-500" : "border-gray-300"
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.prepTime && (
                  <p className="mt-1 text-xs text-red-500">{errors.prepTime}</p>
                )}
              </div>
            </div>

            {/* Item Image */}
            <div className="flex flex-row gap-5 ">
              <div className="flex flex-col w-3/6 ">
                <label className="mb-1 text-sm text-gray-700 font-xs">
                  Item Image
                </label>
                <div
                  className={`flex items-center space-x-4 border ${
                    errors.itemImage ? "border-red-500" : "border-gray-300"
                  } rounded-md py-7 px-5 cursor-pointer hover:bg-gray-100`}
                >
                  {previewItemImage ? (
                    <img
                      src={previewItemImage}
                      alt="Item Image"
                      className="object-cover rounded-mdd"
                    />
                  ) : (
                    <label
                      htmlFor="upload-item-image"
                      className="flex flex-col items-center cursor-pointer"
                    >
                      <img src={upload} className="w-10 h-10" />
                      <span className="text-sm font-medium text-[#008BFF]">
                        Choose Image
                      </span>
                      <span className="text-xs">Image must be under 10mb*</span>
                    </label>
                  )}
                  <input
                    type="file"
                    id="upload-item-image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageFileChange}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Image must be under 10 MB
                </p>
                {errors.itemImage && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.itemImage}
                  </p>
                )}
              </div>

              {/* <div className="flex flex-col w-2/6 ">
                                <label className="mb-1 text-sm text-gray-700 font-xs">Add Icon</label>
                                <div className="flex items-center justify-center w-full px-5 space-x-4 border border-gray-300 rounded-md cursor-pointer h-36 py-7 hover:bg-gray-100">
                                    {iconImage.preview ? (
                                        <img
                                            src={iconImage.preview}
                                            alt="Icon"
                                            className="object-cover w-full h-full rounded-mdd"
                                        />
                                    ) : (
                                        <label htmlFor="upload-icon-image" className="flex flex-col items-center cursor-pointer">

                                            <img src={upload} className="w-10 h-10" />

                                        </label>
                                    )
                                    }
                                    <input
                                        type='file'
                                        id='upload-icon-image'
                                        className='hidden'
                                        accept='image/*'
                                        onChange={handleIconFileChange}
                                    />

                                </div>

                            </div> */}
            </div>

            <div className="flex flex-col ">
              <div className="flex items-center mt-10 space-x-4">
                <input
                  id="addOn"
                  name="addOn"
                  type="checkbox"
                  checked={formData.addonChecked}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      addonChecked: !formData.addonChecked,
                    })
                  }
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor="addOn"
                  className="text-sm text-gray-700 font-xs"
                >
                  Add On
                </label>
              </div>
              {formData.addonChecked && (
                <div className="relative">
                  {/* Dropdown Button */}
                  <div
                    className="w-4/12 px-3 py-2 mt-4 border cursor-pointer border-gray-400 text-[#9CA3B6] rounded-md bg-white text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        showAddonDropdown: !prev.showAddonDropdown,
                      }))
                    }
                  >
                    Select Add Ons 🡣
                  </div>

                  {/* Dropdown List */}
                  {formData.showAddonDropdown && (
                    <div className="z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg ">
                      {loading ? (
                        <p className="p-2">Loading...</p>
                      ) : error ? (
                        <p className="p-2 text-red-500">{error}</p>
                      ) : addons?.length > 0 ? (
                        addons.map((addon) => (
                          <div
                            key={addon.addon_id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              id={`addon-${addon.addon_id}`}
                              checked={formData.selectedAddons.includes(
                                addon.addon_id
                              )}
                              onChange={() =>
                                handleCheckboxChange(addon.addon_id)
                              }
                              className="w-4 h-4"
                            />
                            <label
                              htmlFor={`addon-${addon.addon_id}`}
                              className="ml-2 text-sm text-gray-700"
                            >
                              {addon.addon_name}
                            </label>
                          </div>
                        ))
                      ) : (
                        <p className="p-2 text-gray-500">No addons available</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {formData.selectedAddons.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {formData.selectedAddons.map((addonId) => {
                    const addon = addons?.find((a) => a.addon_id === addonId);
                    return (
                      <span
                        key={addonId}
                        className="bg-[#c5c8cc88] text-[#000000] border-[1px] border-[#443f3f] px-3 py-1 rounded-xl text-sm"
                      >
                        {addon?.addon_name}
                        <span
                          className="items-center justify-center ml-2 -mt-0 text-xl cursor-pointer top-4"
                          onClick={() => handleRemoveAddon(addonId)}
                        >
                          &times;
                        </span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
