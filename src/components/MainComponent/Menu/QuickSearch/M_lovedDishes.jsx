
import React, { useEffect } from "react";
import { useState } from "react";
import SubcategoryPopup from "./SubcategoryPopup";
import { useDispatch, useSelector } from "react-redux";
import { getMostLovedDishes, selectMostLovedDishes, selectApiError, selectApiLoading } from "../../../../redux/slices/dishes";
import { ConfirmationDelete } from "./ConfirmationDelete";
const M_lovedDishes = () => {
  const [subcategoryModal, setSubcategoryModal] = useState(false)
  const dispatch = useDispatch();
  const mostLovedDishes = useSelector(selectMostLovedDishes)
  const loading = useSelector(selectApiLoading)
  const error = useSelector(selectApiError)
  const [confirm, setConfirm] = useState({
    open: false,
    data: null,
  });
  useEffect(() => {
    dispatch(getMostLovedDishes());
  }, [dispatch])

  
  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Most Loved Dishes</h2>
        <button className='bg-orange-500  text-white  px-6 py-2 rounded-lg font-medium'
          onClick={() => setSubcategoryModal(true)}
        >
          <span> + </span>
          <span className="ml-5">NEW DISH</span>

        </button>
      </div>


      {loading && <p className="text-center text-gray-500">Loading dishes...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {/* List of dishes */}
      <div className="flex flex-wrap w-full">
        <p className='text-textThin text-sm font-Roboto font-medium pb-2'>{mostLovedDishes.length} Dishes</p>

        <div className="flex flex-wrap  gap-2 w-full">
          {mostLovedDishes?.length > 0 ? (
            mostLovedDishes?.map((dish, index) => (
              <div className="flex flex-col justify-end items-center relative" key={index}>
                <button onClick={()=>{
                setConfirm({
                  open:true,
                  data:dish.most_loved_dish_id })
                }} className="text-xl font-medium absolute right-5 top-2">&times;</button>
                <div
                  key={dish.most_loved_dish_id}
                  className="border border-gray-200 w-72 rounded-xl shadow-sm p-4 bg-white flex flex-col justify-between"
                >
                  {/* Top Section: Image and Details */}
                  <div className="flex">
                    <img
                      src={dish.subcategory_detail.logo}
                      alt={dish.name}
                      className="w-20 h-20 object-cover rounded-lg mr-4 border border-imageBorder"
                    />
                    <div className="flex flex-col">
                      <h3 className="text-lg font-semibold ">{dish.subcategory_detail.subcategory_title}</h3>
                      <p className="text-textLabel text-lg">{dish.subcategory_detail.items.length} Dishes </p>
                    </div>
                  </div>

                  {/* Bottom Section: Cuisine and Items */}
                  <div className="flex justify-between mt-4 text-sm font-medium text-orange-500">
                    <p className="text-md text-[#752B0A] font-Roboto font-medium text-xl">Restaurant :{dish.subcategory_detail.restaurants.length} </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            !loading && <p className="text-center text-gray-500 col-span-full">No dishes found.</p>
          )}
        </div>
      </div>

      {subcategoryModal &&
        <div>
          <SubcategoryPopup onClose={() => setSubcategoryModal(false)} />
        </div>}
      {/* Confirmation Modal */}
        <ConfirmationDelete
        open={confirm.open}
        onHide={() => {
          setConfirm({ open: false, data: null });
        }}
        value={confirm.data}
        title={"Most Loved Dishes"}
        description={"Are you sure, You want to Delete ?"}
        button={"Logout"}
        process={"lovedDishes"}
      />
    </div>
  );
};

export default M_lovedDishes;
