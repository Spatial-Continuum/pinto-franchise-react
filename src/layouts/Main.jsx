import React, { Children } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import MetricsCard from "../components/MetricsCard/MetricsCard";
import '../assets/styles/adminLayout.css'
import SearchBox from "../components/SearchBox/searchBox";

import DateBox from '../components/Dropdown/DateBox'
import FilterDropdown from "../components/Dropdown/FilterDropdown";



const Main = ({ children }) => {
    return (
        <div className="admin-layout">
            <Navbar />
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="cards-and-content">
                    <MetricsCard />
                    <div className="searchBox-and-content">
                        <SearchBox />
                        <div className="datepicker-and-content">
                            <DateBox />
                            <div className="filterDropdown-and-content">
                                <FilterDropdown />
                                <div className="main-content">
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main