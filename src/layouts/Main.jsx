import React, { Children } from "react";
import Sidebar from "../layouts/Sidebar";
import Navbar from "../layouts/Navbar";
import MetricsCard from "../components/MetricsCard/MetricsCard";

import { useState } from "react";

import DateBox from '../components/Dropdown/DateBox'
import FilterDropdown from "../components/Dropdown/FilterDropdown";
import SearchBox from "../components/SearchBox/SearchBox";



const Main = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);
    return (
      <div className="h-screen bg-gray-100">
        <div className="grid grid-cols-[auto,1fr] h-full">
          {/* Sidebar with fixed height */}
          <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
          
          {/* Main content with scrollable area */}
          <div className="flex flex-col h-full overflow-hidden">
            <Navbar />
            <main className="main-content-scrollable overflow-y-auto flex-1">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  };
  

export default Main