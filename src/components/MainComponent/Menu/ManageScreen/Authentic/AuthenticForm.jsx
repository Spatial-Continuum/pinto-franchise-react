import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout";
import Group from "../../../../../assets/images/Group.png";
import { Menu as MenuIcon, Upload } from "lucide-react";
import ImageChange from "../../../../../assets/images/Image-change.png";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

const AddAuthenticForm = () => {
  const fileInoutRef = useRef();
  const location = useLocation();
  const authentics = location?.state?.Authetics || [];
  const singleAuthentic = location.state?.Authetic || {};
  const edit = location?.state?.edit || false;
  const [formstate, setFormState] = useState({
    list_restaurant: [],
    title: "",
  });
  const [loading, setLoading] = useState(false);
  let debounceTimeout;
  const navigate = useNavigate();
  return (
    <MainLayout
      headerName={"Back"}
      headerClick={() => {
        navigate("menu/manage-screen/show-authentic", {
          state: { authentics },
        });
      }}
    >
      <div className="m-6">
        <h2 className="text-lg font-semibold">
          {" "}
          {edit ? "Edit " : "Add "}Restaurant
        </h2>
        <form onSubmit>
          <div className="p-6 border rounded-lg m-2">
            <div className="flex ">
              <div className="mb-6 ml-8 relative ">
                <label className="block text-sm mb-2">Add sub category</label>
                <input
                  type="text"
                  placeholder="Enter to add"
                  className="border border-gray-300 rounded-lg px-3 py-2 w-56"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                {loading && <p className="text-gray-400 mt-2">Loading...</p>}
                {subCategories.length > 0 && (
                  <ul className="absolute z-2 top-full border rounded mt-2 shadow-md max-h-48 overflow-auto bg-gray-100">
                    {subCategories.map((item) => (
                      <li
                        key={item.subcategory_id}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleSelect(item)}
                      >
                        {item.subcategory_title}
                      </li>
                    ))}

                    <li
                      className="p-2 text-blue-500 cursor-pointer"
                      onClick={() => {
                        SetType("SubCategory"), setShowModal(true);
                      }}
                    >
                      Add new Sub category
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
export default AddAuthenticForm;
