import React, { useEffect, useState } from "react";
import rating from '../../../../assets/images/rating.svg';
import RestaurantPopup from "./RestaurantPopup";
import { useDispatch, useSelector } from "react-redux";
import { selectMostLovedDishes } from "../../../../redux/slices/dishes";
import { getAllMostLovedRestaurant, selectApiError, selectApiLoading, selectMostLovedrestaurant } from "../../../../redux/slices/restaurant";
import { getCurrentDayHours } from "../../../../Utils/Timing";
import star from '../../../../assets/images/star.svg'
import { ConfirmationDelete } from "./ConfirmationDelete";
const M_lovedRestaurant = () => {
  const [restaurantPopup, setRestaurantPopup] = useState(false)

  const dispatch = useDispatch();
  const mostLovedRestaurant = useSelector(selectMostLovedrestaurant)
  const loading = useSelector(selectApiLoading)
  const error = useSelector(selectApiError)
  const [confirm, setConfirm] = useState({
    open: false,
    data: null,
  });

  useEffect(() => {
    dispatch(getAllMostLovedRestaurant());

  }, [dispatch])

  console.log("mostLovedRestaurant", mostLovedRestaurant);


  return (
    <div className="">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Most Loved Restaurants</h2>
        <button className="text-white bg-orange-500 px-4 py-2 rounded-lg font-medium hover:bg-orange-600"
          onClick={() => setRestaurantPopup(true)}
          disabled={mostLovedRestaurant.length == 8}
        >
          <span> + </span>
          <span className="ml-5">RESTAURANT</span>

        </button>
      </div>

      {/* Sub-header */}
      <div className="flex justify-between items-center mb-4 text-sm text-gray-500">
        <p>{mostLovedRestaurant.length} Restaurants</p>

      </div>

      {/* Grid of Cards */}
      <div className="flex flex-wrap w-full gap-5">

        {mostLovedRestaurant?.map((restaurant, index) => (
          <div className=" relative" key={index}>
            <button onClick={() => {
              setConfirm({
                open: true,
                data: restaurant.most_loved_restaurant_id
              })
            }} className="text-xl font-medium absolute right-5 top-2">&times;</button>
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white flex"
            >
              {/* Left: Image */}
              <img
                src={restaurant.restaurant_detail.logo}
                alt={restaurant.restaurant_detail.name}
                className="w-24 h-24 object-cover rounded-lg mr-4"
              />

              {/* Right: Details */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{restaurant.restaurant_detail.name}</h3>
                  <p className="text-sm text-gray-500">{restaurant.restaurant_detail.street_address_1},{" "} {restaurant.restaurant_detail.street}, {" "}{restaurant.restaurant_detail.sublocality}</p>
                  <p className="text-sm text-gray-500 py-1">Timings: {getCurrentDayHours(restaurant.restaurant_detail.opening_hours)}</p>
                </div>
                <div className='flex flex-row gap-3 my-2'>
                  <p className="text-sm text-[#FFFFFF] w-2/12 flex justify-items-start pl-2 gap-2 rounded-md bg-green-600 border-[0.1px]"> <img src={star} alt="" /> {restaurant.restaurant_detail.average_rating}</p>
                  <p className="text-sm text-gray-600">{restaurant.restaurant_detail.number_of_ratings} ratings</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {restaurantPopup &&
        <div>
          <RestaurantPopup onClose={() => setRestaurantPopup(false)} />
        </div>}

      {/* Confirmation Modal */}
      <ConfirmationDelete
        open={confirm.open}
        onHide={() => {
          setConfirm({ open: false, data: null });
        }}
        value={confirm.data}
        title={"Most Loved Restaurant"}
        description={"Are you sure, You want to Delete ?"}
        button={"Logout"}
        process={"lovedRestaurant"}
      />
    </div>
  );
};

export default M_lovedRestaurant;
