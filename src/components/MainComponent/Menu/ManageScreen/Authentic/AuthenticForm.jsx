import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigatefrom } from "react-router-dom";
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
          state: {},
        });
      }}
    >
      <div className="m-6">
        <h2 className="text-lg font-semibold">
          {" "}
          {edit ? "Edit " : "Add "}Restaurant
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="p-6 border rounded-lg m-2">
            <div className="flex ">
              <div className="mb-6"></div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};
export default AddAuthenticForm;
