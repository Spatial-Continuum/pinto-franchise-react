import React, { Children } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar"
import MetricsCard from "../components/MetricsCard/MetricsCard";
import '../assets/styles/adminLayout.css'
import SearchBox from "../components/SearchBox/searchBox";


const AdminLayout = ({ Children }) => {
    return (
        <div className="admin-layout">
            <Navbar />
            <div className="sidebar-and-content">
                <Sidebar />
                <div className="cards-and-content">
                    <MetricsCard />
                    <div className="searchBox-and-content">
                        <SearchBox />
                    <div className="main-content">
                        {Children}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminLayout