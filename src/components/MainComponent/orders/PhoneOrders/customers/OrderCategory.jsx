import React, { useEffect, useState } from "react";
import PropsSearchBox from "../../../../GeneralComponent/SearchBox/PropsSearchBox";
import rectangle from "../../../../../assets/images/rectangularImage.svg";
import MainLayout from "../../../../GeneralComponent/Layout/MainLayout";
import { Switch } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getRestaurantById,
  selectSelectedRestaurant,
} from "../../../../../redux/slices/restaurant";
import { useSelector } from "react-redux";
import Preparation from "../../../../../assets/images/preparation.svg";
import {
  CreateCustomerCart,
  GetCartorderList,
  getCartPresentOrder,
  UpdateCustomerCart,
} from "../../../../../redux/slices/cart";

const OrderCategory = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { restaurantid } = useParams();
  const { userid } = useParams();
  const RestaurantDetails = useSelector(selectSelectedRestaurant);
  const CartDetails = useSelector(GetCartorderList);
  const [filteredItems, setFilteredItems] = useState([]);
  const [visible, setVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  console.log("CartDetails", CartDetails);
useEffect(() => {
  if (CartDetails?.items) {
    setItems(CartDetails.items);
  }
}, [CartDetails]);
  useEffect(() => {
    dispatch(getRestaurantById(restaurantid));
    dispatch(getCartPresentOrder(userid));
  }, [dispatch, restaurantid, userid]);

  const menuTitles =
    RestaurantDetails?.menu_categories?.length > 0 &&
    RestaurantDetails?.menu_categories.map((category) => category.menu_title);
  console.log(filteredItems, "filteredItems");

  const handleFilter = (selectedTitle) => {
    if (selectedTitle === "all") {
      setFilteredItems([]);
    } else {
      const filteredCategory = RestaurantDetails?.menu_categories?.filter(
        (category) => category.menu_title === selectedTitle
      );
      setFilteredItems(filteredCategory);
    }
  };

  const handleIncrement =  (itemId, item) => {
    const newQty = (quantities[itemId] || 0) + 1;
    setQuantities((prev) => ({ ...prev, [itemId]: newQty }));

    const payload = {
      customer_user_id: userid,
      item_id: item.item_id,
      quantity: 1,
    };

    console.log("Increment payload:", payload);
    dispatch(CreateCustomerCart(payload))
      .unwrap()
      .then(async() => {
       const res = await dispatch(getCartPresentOrder(userid));
       console.log("Updated Cart Details:", res);
       setItems( res.payload.items)
      });
  };

  const handleDecrement = (itemId, item) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = currentQty - 1;

    const updatedQuantities = { ...quantities };
    if (newQty <= 0) {
      delete updatedQuantities[itemId]; // Remove item when 0
    } else {
      updatedQuantities[itemId] = newQty;
    }
    setQuantities(updatedQuantities);

    const payload = {
      customer_user_id: userid,
      item_id: item.item_id,
      quantity: -1,
    };
    console.log("decreament payload:", payload);
    dispatch(CreateCustomerCart(payload)) .unwrap()
      .then(async() => {
       const res = await dispatch(getCartPresentOrder(userid));
       console.log("Updated Cart Details:", res);
       setItems( res.payload.items)
      });
  };

  const handleQuantityChange = (itemId, change) => {
    let quantity = {};
    const updatedItems = items?.map((entry) => {
      if (entry?.item.item_id === itemId) {
        const newQuantity = entry.quantity + change;
        if (newQuantity >= 0) {
          console.log({
            customer_user_id: CartDetails.customer_user_id,
            item_id: entry.item.item_id,
            quantity: change,
          });
          quantity = {
            customer_user_id: CartDetails.customer_user_id,
            item_id: entry.item.item_id,
            quantity: change,
          }
          return { ...entry, quantity: newQuantity };
        }
      }
      return entry;
    });
    setItems(updatedItems);
        dispatch(UpdateCustomerCart({userId: userid, order: quantity})).unwrap()
      .then(() => {
        dispatch(getCartPresentOrder(userid));
      }
      )

  };

  return (
    <div>
      <MainLayout>
        <div>
          <div className="relative">
            <img
              src={RestaurantDetails?.image}
              alt="Top Banner"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-48 inset-x-8 flex  gap-4">
              <PropsSearchBox placeholder="Search Restaurant" />
              <input
                type="text"
                placeholder="Restaurant ID"
                className="w-1/12 h-10 px-4 text-gray-700 bg-[#FFFFFF] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex  items-center mt-6 px-6">
            <div className="flex w-8/12 justify-between items-center ">
              <button className="text-[#FF6B00] font-semibold text-lg border-b-4 rounded- border-[#FF6B00]">
                Menu
              </button>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <Switch color="green" defaultChecked />
                  <span className="text-[#00A210] font-medium">Veg</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer bg-transparent"
                  />
                  <div className="w-11 h-6 bg-[#FFFFFF] peer-focus:outline-none peer-focus:ring-2  rounded-lg "></div>
                </label>
              </div>
            </div>

            <div>
              <input
                type="text"
                placeholder="Search"
                className=" focus:outline-none focus:border-orange-500"
              />
            </div>
          </div>
          <div className="w-full mx-6 h-px bg-gray-300"></div>

          <h2 className="text-xl font-bold mt-6 px-6">Category</h2>
          <div className="flex flex-wrap gap-4 mt-4 px-6">
            <span
              className="bg-[#FAFAFA]  border-[#030714] border-[1px] px-6 py-2 rounded-full text-gray-700 hover:bg-orange-500 hover:text-white cursor-pointer"
              onClick={() => {
                handleFilter("all");
              }}
            >
              All
            </span>
            {menuTitles &&
              menuTitles?.map((category, index) => (
                <>
                  <span
                    key={index}
                    className="bg-[#FAFAFA]  border-[#030714] border-[1px] px-6 py-2 rounded-full text-gray-700 hover:bg-orange-500 hover:text-white cursor-pointer"
                    onClick={() => {
                      handleFilter(category);
                    }}
                  >
                    {category}
                  </span>
                </>
              ))}
          </div>

          <div>
            {filteredItems?.length > 0
              ? filteredItems.map((category, index) => (
                  <div
                    key={category.restaurant}
                    className="grid grid-cols-6 gap-6 mt-6 px-6"
                  >
                    {category.items.map((item) => (
                      <div key={index} className="flex flex-col items-start">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.item_name}
                            className="w-full h-full object-cover"
                          />
                          <button className="absolute bottom-2 right-2 bg-white text-green-500 font-bold text-sm px-3 py-1 rounded">
                            ADD
                          </button>
                        </div>

                        {/* Dish Name and Delivery */}
                        <div className="flex justify-between w-full mt-2">
                          <span className="font-semibold">
                            {item.item_name}
                          </span>
                          <span className="text-xs items-center  py-1 px-1 text-[#FF00C7] bg-[#f1ceea] rounded-lg">
                            {item.delivery}
                          </span>
                        </div>

                        {/* Rating and Timing */}
                        <div className="flex items-center text-gray-600 mt-1">
                          <span className="flex items-center mr-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-yellow-400 mr-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.389 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.175 0l-3.389 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.293 8.397c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                            </svg>
                            {item.average_rating}
                          </span>
                          <span>
                            <span className="flex items-center mr-4">
                              <img src={Preparation}></img>
                              {item.preparation_time} mins
                            </span>
                          </span>
                        </div>
                        <div className="text-lg font-bold mt-1">
                          {item.selling_price}
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              : RestaurantDetails?.menu_categories?.map((dish) => (
                  <div
                    key={dish.restaurant_id}
                    className="flex gap-20 mt-6 px-6"
                  >
                    {dish.items.map((item) => {
                      const qty = quantities[item.item_id] || 0;
                      return (
                        <div
                          key={item.item_id}
                          className="flex flex-col items-start"
                        >
                          <div className="relative w-full h-40 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.item_name}
                              className="w-full h-full object-cover"
                            />
                            {qty === 0 ? (
                              <button
                                className="absolute bottom-2 right-2 bg-white text-green-500 font-bold text-sm px-3 py-1 rounded"
                                onClick={() =>
                                  handleIncrement(item.item_id, item)
                                }
                              >
                                ADD
                              </button>
                            ) : (
                              <div className="absolute bottom-2 right-2 flex items-center bg-white text-green-500 font-bold text-sm px-2 py-1 rounded">
                                <button
                                  className="px-2"
                                  onClick={() =>
                                    handleDecrement(item.item_id, item)
                                  }
                                >
                                  -
                                </button>
                                <span className="px-2">{qty}</span>
                                <button
                                  className="px-2"
                                  onClick={() =>
                                    handleIncrement(item.item_id, item)
                                  }
                                >
                                  +
                                </button>
                              </div>
                            )}
                          </div>

                          <div className="flex justify-between w-full mt-2 gap-4">
                            <span className="font-semibold">
                              {item.item_name}
                            </span>
                            <span className="text-xs items-center py-1 px-1 text-[#FF00C7] bg-[#f1ceea] rounded-lg">
                              Free Delivery
                            </span>
                          </div>

                          <div className="flex items-center text-gray-600 mt-1">
                            <span className="flex items-center mr-4">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-yellow-400 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.389 2.46a1 1 0 00-.364 1.118l1.286 3.97c.3.921-.755 1.688-1.54 1.118l-3.389-2.46a1 1 0 00-1.175 0l-3.389 2.46c-.784.57-1.838-.197-1.54-1.118l1.286-3.97a1 1 0 00-.364-1.118L2.293 8.397c-.783-.57-.381-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                              </svg>
                              {item.average_rating}
                            </span>
                            <span>
                              <span className="flex items-center mr-4">
                                <img src={Preparation}></img>
                                {item.preparation_time} mins
                              </span>
                            </span>
                          </div>

                          <div className="text-lg mt-1">
                            Rs. {item.selling_price}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
          </div>
        </div>
        {visible && (
          <div
            onClick={() => setVisible(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          />
        )}
        <div style={{ position: "fixed", bottom: 0, right: 0, width: "25%" }}>
          {!visible ? (
            <button
              onClick={() => setVisible(true)}
              style={{
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                backgroundColor: "#222",
                color: "#fff",
                width: "100%",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
                zIndex: 1000,
              }}
            >
              <span>{items?.length} items</span>
              <span>View Cart</span>
            </button>
          ) : (
            <div
              style={{
                backgroundColor: "#FAFAFA",
                boxShadow: "0 -2px 10px rgba(0,0,0,0.2)",
                padding: "20px",
                height: "500px",
                borderTopLeftRadius: "20px",
                borderTopRightRadius: "20px",
                overflowY: "auto",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3 className="font-bold text-lg my-3">Cart Summary</h3>
                <button onClick={() => setVisible(false)}>&#10005;</button>
              </div>
              {items?.map((entry) => (
                <div
                  key={entry.item.item_id}
                  style={{
                    padding: "20px 0",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    overflowY: "auto",
                  }}
                >
                  <div>
                    <h4 className="font-medium">{entry.item.item_name}</h4>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      alignItems: "end",
                    }}
                  >
                    <div>
                      <h5 className="font-medium">
                        &#8377; {entry.item_total_price}
                      </h5>
                    </div>
                    <div className="border-2 px-6 py-2 my-2 font-semibold border-orange-600 text-orange-600 rounded-lg flex items-center">
                      <button
                        onClick={() =>
                          handleQuantityChange(entry.item.item_id, -1)
                        }
                      >
                        -
                      </button>
                      <span className="px-4">{entry.quantity}</span>
                      <button
                        onClick={() =>
                          handleQuantityChange(entry.item.item_id, 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-center absolute bottom-5 left-0 w-full ">
                <button className="py-2 bg-black text-white text-center rounded-lg w-96">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </MainLayout>
    </div>
  );
};

export default OrderCategory;
