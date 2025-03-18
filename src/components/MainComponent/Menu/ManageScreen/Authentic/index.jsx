import React, { useState, useEffect } from "react";
import CategoryCard from "../../../../GeneralComponent/FlexElement/CategoryCard.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAuthenticateApi,
  selectAutheticate,
  selectApiLoading,
  selectApiError,
} from "../../../../../redux/slices/menu.js";
import { useNavigate } from "react-router-dom";

function AuthenticStyle() {
  const dispatch = useDispatch();
  const Authentic = useSelector(selectAutheticate);
  const loading = useSelector(selectApiLoading);
  const error = useSelector(selectApiError);
  const navigate = useNavigate();
  useEffect(() => {
    console.log("Dispatching fetchCategoryApi");
    dispatch(fetchAuthenticateApi());
  }, [dispatch]);
  return (
    <div className="mb-8 mt-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Authentic style of Cooking</h2>
        <button
          className="text-orange-500 text-sm"
          onClick={() => {
            navigate("/menu/manage-screen/show-authentic", {
              state: { Authentic },
            });
          }}
        >
          View all
        </button>
      </div>
      <div className="flex flex-row gap-5">
        {Authentic?.slice(0, Authentic.length > 4 ? 4 : Authentic.length).map(
          (authentic) => (
            <CategoryCard
              key={authentic.authentic_id}
              {...authentic}
              style="w-56 h-50"
              imagestyle="w-56 h-28 border rounded-t-lg"
              title={authentic.authentic_title}
              AdditonalText={
                <div className="p-2">
                  {" "}
                  <h5 className="text-sm bold">{authentic.name}</h5>
                  <p style={{ fontSize: "10px" }}>
                    {authentic.short_description}
                  </p>
                </div>
              }
              // onEdit={()=>{navigate("/menu/manage-screen/categoty-form" , { state: { category,categories } })}}
            />
          )
        )}
        <CategoryCard
          add={true}
          isAdd={true}
          categories={Authentic}
          style={"w-56 h-42"}
          onEdit={() => {
            navigate("/menu/manage-screen/categoty-form", {
              state: { Authentic },
            });
          }}
        />
      </div>
    </div>
  );
}
export default AuthenticStyle;
