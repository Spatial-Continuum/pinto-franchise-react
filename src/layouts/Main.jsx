import React, { Children } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import MetricsCard from "../components/MetricsCard/MetricsCard";



import DateBox from '../components/Dropdown/DateBox'
import FilterDropdown from "../components/Dropdown/FilterDropdown";
import SearchBox from "../components/SearchBox/SearchBox";
import '../assets/styles/main.css'


const Main = ({ children }) => {
    return (
        <div className="kila">
        <div className="admin-layout">
            <Navbar />
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="cards-and-content">
                    <MetricsCard />
                    <div className="searchBox-and-content">
                        <SearchBox/>
                        <div className="datepicker-and-content">
                            <DateBox />
                            <div className="filterDropdown-and-content">
                                <FilterDropdown />
                                <div className="main-content-scrollable">
                                    {children}
                                </div>
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