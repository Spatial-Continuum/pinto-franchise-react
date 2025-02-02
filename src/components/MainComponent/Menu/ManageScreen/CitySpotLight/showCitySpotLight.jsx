import React, { useState } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import ShowFlexElements from "../../../../GeneralComponent/FlexElement/ShowFlexElement.jsx";
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx";
import { useNavigate } from "react-router-dom";
import Spot from "../../../../../assets/images/spotlightbanner.svg";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout.jsx";
import { useDispatch } from "react-redux";
import { fetchCitySpotApi } from "../../../../../redux/slices/menu.js";
import { MdEdit } from "react-icons/md";
import Group from "../../../../../assets/images/Group.png";
import {
  Menu as MenuIcon,
  Search,
  PlusCircle,
  Home,
  ShoppingCart,
  Store,
  Truck,
  Settings,
  BarChart2,
  MessageSquare,
  HelpCircle,
  Bell,
  PenSquare,
  Upload,
  ChevronLeft,
} from "lucide-react";
function ShowSpotLight() {
  const location = useLocation();
  const [citySpots, setCitySopts] = useState(location?.state?.citySpots || []);
  const [categoryName, setCategoryName] = useState("");
  const [singleCategory, setSingleCategory] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [subCategories, setSubCategories] = useState([]);
  const [searchSubCate, setSearchCate] = useState("");
  let debounceTimeout;
  const [loading, setLoading] = useState(false);
  const handleSubcategory = (singlecity, categories) => {
    setCategoryName(singlecity?.cityspotlight_id);
    setSingleCategory(singlecity);
  };
  const [edit, setEdit] = useState("edit");
  console.log("kjisdahflaksd", citySpots);
  useEffect(() => {
    console.log("Dispatching fetchQuickFilterApi");
    dispatch(fetchCitySpotApi());
  }, [dispatch]);

  const handleSubCategotyChange = (e) => {
    const value = e.target.value;
    setSearchCate(value);
    console.log("sadfadfasd", value);
    // Clear the previous timeout
    if (debounceTimeout) clearTimeout(debounceTimeout);

    // Set a new timeout to trigger the API call after 500ms
    debounceTimeout = setTimeout(() => {
      fetchSubCategories(value);
    }, 500);
    console.log("let see what is the  output of the give ", debounceTimeout);
  };

  const fetchSubCategories = async (query) => {
    console.log("new creat3de tine", query);
    if (!query) {
      setSubCategories([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${API_URL}/menu/subcategory/by-name?subcategory_title=${query}`
      );
      const data = await response.json();
      console.log("sadfasd", data);
      setSubCategories(data || []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSelect = (item) => {
    console.log("valhslfjls", item);
    let sub_id =
      item?.subcategory_id || item.subcategory_detail?.subcategory_id;
    let formData = {};
    formData["subcategory_id"] = sub_id;
    let url_link = `https://service.pintogroups.in/menu/cityspotlights`;
    axios
      .post(url_link, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        const data = response.data;
        console.log("category id category id subcate", response.data);
        console.log("klasjdljasdowewe", citySpots);
        const updatedData = [...citySpots, data];
        setCitySopts(updatedData);
        setSubCategories([]);
        setSearchCate("");
      })
      .catch(function (error) {
        console.log("error one");
        console.log(error);
      });

    // setCitySopts((previtem) => {
    //   const exists = previtem.some(
    //     (item1) =>
    //       (item1?.subcategory_id ||
    //         item1?.subcategory_detail?.subcategory_id) === item.subcategory_id
    //   );
    //   if (!exists) {
    //     console.log("idkjdeeioffjffjf");
    //     return [...previtem, item];
    //   }
    //   console.log("kasdjljasds");
    //   return previtem;
    // });

    // setSubCategories([]);
  };

  const handleRemoveItem = (item) => {
    console.log("jkhsdkhkas233", item);

    let url_link = `https://service.pintogroups.in/menu/cityspotlights/${item.cityspotlight_id}`;
    axios
      .delete(url_link)
      .then(function (response) {
        setCitySopts((previtem) =>
          previtem.filter(
            (item1) => item1.cityspotlight_id !== item.cityspotlight_id
          )
        );

        console.log("iajdsljasldfjweow", citySpots);
      })
      .catch(function (error) {
        console.log("error one");
        console.log(error);
      });
  };
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() =>
        navigate("/menu/manage-screen", { state: { citySpots } })
      }
    >
      <div className="p-6">
        <div>
          <div className="relative mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">City spotlight</h2>
              <button
                onClick={() => {
                  navigate("/menu/home-screen/add-filter-form", {
                    state: { citySpots },
                  });
                }}
                className="px-4 py-2 border border-blue-500 rounded-lg text-blue-600"
              >
                Contact Support
              </button>
            </div>
          </div>
          <div className="mb-8">
            <div className="flex flex-wrap gap-5">
              {citySpots?.[0] && (
                <CategoryCard
                  image={Spot}
                  style="w-54 h-48"
                  imagestyle="w-54 h-48 p-2 border rounded-lg"
                  setSub={() => handleSubcategory(citySpots)}
                />
              )}
            </div>
          </div>
          <div className="mb-8">
            <div className="flex justify-between mb-8">
              <h2 className="text-lg font-semibold">Customize Items</h2>
              {edit == "edit" ? (
                <button
                  onClick={() => setEdit("done")}
                  className="p-2 text-orange-600  flex item-center"
                >
                  <MdEdit className="mt-1 mr-2" />
                  Edit
                </button>
              ) : (
                <button
                  onClick={() => setEdit("edit")}
                  className="p-2 text-[#FF6B00]  flex item-center"
                >
                  Done
                </button>
              )}
            </div>

            <div className="border rounded-lg p-4">
              <p className="mt-4">Add Sub Category</p>
              {edit == "done" ? (
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search here"
                      className="border border-gray-300 rounded-lg px-2 mt-2 py-1 pl-10 w-80 focus:outline-none focus:ring-2 focus:ring-gray-300 "
                      value={searchSubCate}
                      onChange={handleSubCategotyChange}
                    />
                    <Search className="w-5 h-5  absolute  text-gray-400 top-4 left-2" />
                    {loading && (
                      <p className="text-gray-400 mt-2">Loading...</p>
                    )}
                    {subCategories.length > 0 && (
                      <ul className="absolute z-999 top-full border rounded  shadow-md max-h-48 w-80 overflow-auto bg-white">
                        {subCategories.map((item) => (
                          <li
                            key={item.subcategory_id}
                            className="p-2 cursor-pointer hover:bg-gray-100"
                            onClick={() => handleSelect(item)}
                          >
                            <div className="grid grid-cols-[1fr,6fr] ">
                              <img src={item.logo} className="w-8 h-8" />
                              <span>{item.subcategory_title}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              <p className="mt-4">Items in the Spotlight</p>

              <div className="my-8">
                <div className="border border-gray-200 rounded-lg">
                  <div className="flex flex-wrap gap-4 m-4">
                    {citySpots?.map((item, index) => (
                      <div
                        key={
                          item?.subcategory_id ||
                          item?.subcategory_detail?.subcategory_id
                        }
                      >
                        <div
                          className="mb-1"
                          style={{ display: "flex", alignItems: "center" }}
                        >
                          {edit == "done" ? (
                            <span className="ml-2">
                              <img src={Group} />
                            </span>
                          ) : (
                            ""
                          )}
                          <span className="ml-2">
                            {item?.subcategory_title ||
                              item?.subcategory_detail?.subcategory_title}
                          </span>
                          {edit == "done" ? (
                            <span
                              className="ml-4"
                              onClick={() => handleRemoveItem(item)}
                            >
                              x
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <img
                          src={item?.subcategory_detail?.logo || item?.logo}
                          alt={
                            item?.subcategory_title ||
                            item?.subcategory_detail?.subcategory_title
                          }
                          className="border border-2 z-1 rounded-md  w-44 h-40"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
export default ShowSpotLight;
