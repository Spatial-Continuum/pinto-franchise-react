import React, { useState } from "react";
import MainLayout from "../../../GeneralComponent/Layout/MainLayout";
import OrderHistoryTable from "./OrderHistoryTable";
import SearchBox from "../../../GeneralComponent/SearchBox/SearchBox";
import FilterDropdown from "../../../GeneralComponent/Dropdown/FilterDropdown";
import search from "../../../../assets/images/prime_search.svg";
import OrderHistoryFilterDropdown from "../../../GeneralComponent/Dropdown/OrderHistoryFilterDropdown";
import DateBox from "../../../../components/GeneralComponent/Dropdown/DateBox";
import Filter from "../../../../components/GeneralComponent/Dropdown/Filter";
import { FaMobileAlt, FaPhoneAlt } from "react-icons/fa";
const OrderHistoryIndex = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const filterOptions = [
    // { label: 'success', value: "Success" },
    { label: "All", value: "all" },
    { label: "App Orders", value: "Rejected", icon: <FaMobileAlt /> },
    { label: "Phone Orders", value: "Phone Orders", icon: <FaPhoneAlt /> },
  ];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <MainLayout headerName="Order History">
      <div className="flex flex-row justify-between">
        <div>
          <SearchBox
            placeholder="search by name"
            img={search}
            onSearch={handleSearch}
          />
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <OrderHistoryFilterDropdown options={filterOptions} />
          </div>
          <div>
            <DateBox />
          </div>
          <div>
            <Filter />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <OrderHistoryTable searchTerm={searchTerm} />
      </div>
    </MainLayout>
  );
};

export default OrderHistoryIndex;
