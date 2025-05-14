
import React, { useState } from "react";
import MainLayout from "../../../GeneralComponent/Layout/MainLayout";
import SearchRestaurant from "./restaurants/SearchRestaurant";
import CustomerOrder from "./customers/CustomerOrder";
import NewOrder from "./customers/NewOrder";
import OrderCategory from "./customers/OrderCategory";
import Checkout from "./customers/Checkout";
import CustomerDetail from "./restaurants/CustomerDetail";
import OrderTable from "./restaurants/OrderTable";

const PhoneOrder = () => {
    const [activeTab, setActiveTab] = useState("Restaurant");

    return (
        <div>
            <MainLayout>
                <div className=" mt-8">
                    {/* Buttons */}
                    <div className="flex gap-6">
                        <button
                            className={`px-8 py-1 font-bold rounded ${activeTab === "Restaurant" ? "bg-[#030714] text-[#FAFAFA] border-[1px] border-[#030714]" : "bg-[#FAFAFA] border-[1px] border-[#030714] text-[#030714]"
                                }`}
                            onClick={() => setActiveTab("Restaurant")}
                        >
                            Restaurant
                        </button>
                        <button
                            className={`px-8 py-1 font-bold rounded ${activeTab === "Customer" ? "bg-[#030714] text-[#FAFAFA] border-[1px] border-[#030714]" : "bg-[#FAFAFA] border-[1px] border-[#030714] text-[#030714]"
                                }`}
                            onClick={() => setActiveTab("Customer")}
                        >
                            Customer
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="mt-6">
                        {activeTab === "Restaurant" && (
                            <div>
                                <SearchRestaurant/>
                                {/* <CustomerDetail/> */}
                                {/* <OrderTable/> */}
                            </div>
                        )}
                        {activeTab === "Customer" && (
                            <div>
                                <CustomerOrder/>
                                {/* <NewOrder/>  */}
                                {/* <OrderCategory/> */}
                                {/* <Checkout /> */}
                               
                            </div>
                        )}
                    </div>
                </div>
            </MainLayout>
        </div>
    )
}

export default PhoneOrder







