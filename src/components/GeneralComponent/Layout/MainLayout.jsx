import React, { Children } from "react";

import Sidebar from "../Layout/SideBar.jsx"
import HeaderBar from "../Layout/HeaderBar.jsx";


import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";




const MainLayout = ({ children, headerName, headerClick }) => {

  const [isExpanded, setIsExpanded] = useState(true);
  const location = useLocation();
  console.log("params", location.pathname === "/orders/category");

  return (
    <div className="h-screen bg-gray-100">
      <div className="grid grid-cols-[auto,1fr] h-full">


        <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />


        <div className="flex flex-col h-full overflow-hidden cursor-pointer">
          <HeaderBar name={headerName ? headerName : ''} headerClick={headerClick ? headerClick : ""} />
          <main className={`${location.pathname === "/orders/category" ? " main-content-scrollable  overflow-y-auto flex-1 " : "  main-content-scrollable overflow-y-auto flex-1 py-8 pl-8 pr-4"}`} style={{
            scrollbarWidth: "thin", /* For Firefox */
            scrollbarColor: "#4a5568 #e2e8f0", /* Thumb and track colors */
          }}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};



export default MainLayout;

