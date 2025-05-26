/* eslint-disable no-constant-condition */
import React, { useEffect } from "react";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout";
import { useDispatch } from "react-redux";
import {
  AssignDeliveryOrder,
  GetNearByPartner,
  GetNearByPartnerList,
  GetRestaurantUser,
  GetRestaurantUserOrder,
} from "../../../../../redux/slices/order";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderTable = () => {
  const order = { id: "12345" }; // Example order ID
  const tableData = [
    {
      partnerId: "P0018",
      name: "John Doe",
      type: "Salaried",
      orders: 10,
      phone: "+91 98765 43210",
      distance: "3 km",
      status: "Pending",
    },
    // Add more rows here as needed
  ];

  const { restaurantid, userid } = useParams();
  const RestaurantUser = useSelector(GetRestaurantUser);
  const NearByPartnerList = useSelector(GetNearByPartnerList);
  console.log("GetNearByPartnerList", GetNearByPartnerList);

  console.log("RestaurantUser", RestaurantUser);
  console.log("NearByPartner", NearByPartnerList);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      GetRestaurantUserOrder({
        user_id: userid,
        restaurant_id: restaurantid,
      })
    );
  }, [restaurantid, userid, dispatch]);

  // useEffect(()=>{
  //   if(RestaurantUser){
  //     console.log("RestaurantUser?.order_id",RestaurantUser?.order_id);

  //     dispatch(GetNearByPartner(RestaurantUser?.order_id))
  //   }
  // },[RestaurantUser,dispatch])

  const handleGetPartnerList = () => {
    if (RestaurantUser) {
      dispatch(GetNearByPartner(RestaurantUser?.order_id));
    }
  };
const handleAssignDelivery = (data) =>{
  console.log(RestaurantUser?.order_id, data?.delivery_partner_id);
 if(RestaurantUser?.order_id && data?.delivery_partner_id){
  dispatch(AssignDeliveryOrder({
        order_id: RestaurantUser?.order_id,
        delivery_partner_id: data?.delivery_partner_id,
  })).unwrap().then(()=>{
    dispatch(GetNearByPartner(RestaurantUser?.order_id));
  })
 }
}

  return (
    <>
      <MainLayout>
        <div className="w-full p-4 space-y-6">
          {/* Restaurant Card */}
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Restaurant"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">
                  {RestaurantUser?.restaurant?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {RestaurantUser?.restaurant?.street},
                  {RestaurantUser?.restaurant?.sublocality},
                  {RestaurantUser?.restaurant?.city},
                  {RestaurantUser?.restaurant?.city}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">
                {RestaurantUser?.restaurant?.primary_phone}
              </p>
              <p className="text-sm text-gray-500">Open: 10:00 AM - 10:00 PM</p>
            </div>
          </div>

          {/* Customer Card */}
          <div className="border rounded-lg p-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <img
                src="https://via.placeholder.com/60"
                alt="Customer"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h2 className="font-bold text-lg">
                  {RestaurantUser?.user?.username}
                </h2>
                <p className="text-sm text-gray-500">
                  456, Another Street, Coimbatore
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{RestaurantUser?.user?.phone}</p>
              <p className="text-sm text-gray-500">
                {RestaurantUser?.user?.email}
              </p>
            </div>
          </div>

          {/* Order Section */}
          <div className="border rounded-lg p-4 space-y-4">
            <h2 className="font-bold text-lg">
              ORDER ID: #{RestaurantUser?.order_code}
            </h2>
            <div className="w-full flex justify-start gap-4 items-center" >
              <div className="w-56">
                <label className="block font-medium">Total Distance</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={RestaurantUser?.delivery_distance}
                  disabled
                />
              </div>
              <div className="w-56">
                <label className="block font-medium">Deliver Fees</label>
                <input
                  type="text"
                  className="border w-full border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={RestaurantUser?.delivery_charge}
                  disabled
                />
              </div>
              <div className="w-62">
                  <button
                onClick={handleGetPartnerList}
                className="px-6 py-2 mt-5 w-full text-white bg-orange-500 rounded-lg hover:bg-green-600 self-end"
              >
                Find Delivery Partner
              </button>
              </div>
            </div>
          </div>

          {/* Data Table */}
          {NearByPartnerList?.length > 0 && (
            <div className="border rounded-lg p-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">NAME</th>
                    <th className="border p-2 text-left">TYPE</th>
                    <th className="border p-2 text-left">ORDERS</th>
                    <th className="border p-2 text-left">PHONE NO</th>
                    <th className="border p-2 text-left">DISTANCE</th>
                    <th className="border p-2 text-left">STATUS</th>
                    <th className="border p-2 text-left">ACTION</th>
                    <th className="border p-2 text-left">RESPONSE</th>
                  </tr>
                </thead>
                <tbody>
                  {NearByPartnerList?.length > 0 ? (
                    NearByPartnerList?.map((row, index) => (
                      <tr key={index}>
                        <td className="border p-2 flex flex-row justify-start items-center gap-2">
                          <img src={row?.user?.profile_image} className="rounded-full w-10 h-10"></img>
                          <p> {row?.full_name}</p>
                          </td>
                        <td className={`${row?.employment_type_display == "Commission" ? "text-orange-500" : "text-green-700"} border p-2 uppercase font-semibold`}>
                          {row?.employment_type_display}
                        </td>
                        <td className="border p-2">
                          {row?.daily_stats?.orders_completed}
                        </td>
                        <td className="border p-2">{row?.user?.phone}</td>
                        <td className="border p-2">
                          {row.distance_km?.toFixed(2)}
                        </td>
                          <td className="border p-2">
                          <span
                            className={`${
                              row.current_status === "Online"
                                ? "text-green-800"
                                : "text-orange-500"
                            }`}
                          >
                            {row.current_status}
                          </span>
                        </td>
                        <td className="border p-2">
                          <button
                            disabled={
                              Object.keys(row?.delivery_request).length !== 0
                            } // disabled if delivery_request not empty
                            className={
                              Object.keys(row?.delivery_request).length === 0
                                ? "px-4 py-1 text-white bg-blue-500 rounded-lg hover:bg-white hover:border-blue-500 hover:border-solid hover:border-2 hover:text-blue-600 cursor-pointer"
                                : "px-4 py-1 text-white bg-gray-400 rounded-lg cursor-not-allowed"
                            }
                            onClick={()=>{handleAssignDelivery(row)}}
                          >
                            
                            {
                              Object.keys(row?.delivery_request).length !== 0 ? "Assigned" : "Assign"
                            }
                          </button>
                        </td>
                        <td className="border p-2 uppercase">
                          <button
                            className={`${row?.delivery_request?.status_display == "Pending" ? "text-violet-600 border-violet-600 bg-violet-300 px-2 py-1 rounded-md uppercase" : row?.delivery_request?.status_display == "Accepted" ? "text-green-600 border-green-600 bg-green-300 px-2 py-1 rounded-md uppercase" : row?.delivery_request?.status_display == "Rejected" || "Expired" ? "text-red-600 border-red-600 bg-red-300 px-2 py-1 rounded-md uppercase"  :"border-1 rounded-md px-2 py-1"}`}
                            
                          >
                            {row?.delivery_request?.status_display}
                          </button>
                        </td>
                        
                      </tr>
                    ))
                  ) : (
                    <p>No data Found</p>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default OrderTable;
