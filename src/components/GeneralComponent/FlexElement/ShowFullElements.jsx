import React, { useState } from "react";
import { Menu as MenuIcon, PenSquare } from "lucide-react";
import vector from "../../../assets/images/Vector_colorless.png";
const ShowFullElements = (props) => {
  console.log("newdfasdfasdf", props);
  return (
    <div
      key={props?.category_id || props?.key}
      onClick={() => {
        props.setSub ? props.setSub() : "";
      }}
    >
      <div className="flex justify-between">
        {props.topName && <span className="text-sm mb-4">{props.title}</span>}
        {props.topEdit && (
          <img
            src={vector}
            alt="edit"
            className="w-3 h-3"
            onClick={
              props?.handleEditTop
                ? () => {
                    props?.handleEditTop();
                  }
                : ""
            }
          />
        )}
      </div>
      <div
        key={props?.category?.category_id || props?.key}
        className={`${
          props.style ? props.style : ""
        }  relative group  bg-white border border-gray-200 rounded-lg hover:shadow-md`}
      >
        <div className="absolute  top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {props?.edit && (
            <PenSquare
              className="w-4 h-4 text-gray-600 hover:text-gray-800"
              onClick={() => {
                props?.onEdit ? props.onEdit() : "";
              }}
            />
          )}
        </div>
        <div className="h-32 w-32 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={props?.category?.image}
            alt={props.title}
          />
        </div>
      </div>
    </div>
  );
};
export default ShowFullElements;
