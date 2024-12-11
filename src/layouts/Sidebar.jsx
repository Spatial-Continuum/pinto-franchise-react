import React, { useState } from "react";
import { Link } from 'react-router-dom';
import '../assets/styles/sidebar.css'
import { Container } from "postcss";


const Sidebar = () => {
    const [isDropdownOpen, setDropddownOpen] = useState(false)
    const toggleDropdown = () => {
        setDropddownOpen(!isDropdownOpen)
    }
    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h3>FOOD</h3>
            </div>


            <ul className="sidebar-nav">
                <li className="drop-options">
                    <Link to="/dashboard" className="nav-link">
                        Dashboard
                    </Link>
                </li>
                <li className="drop-options">
                    <Link to="/orders" className="nav-link">Orders</Link>
                </li>
                <li className="drop-options">
                    <Link to="/merchant" className="nav-link">Merchant</Link>
                </li>
                <li className="dropdown" onClick={toggleDropdown}>
                    <span className={`nav-link ${isDropdownOpen ? "active" : "" }`}>Delivery Partner</span>
                    {isDropdownOpen && (
                        <ul className="dropdown-inline">
                          <li><Link to="/delivery-partner/salaried" className="dropdown-item">Salaried</Link></li>
                          <li><Link to="/delivery-partner/deliverybased" className="dropdown-item">Delivery Based</Link></li>
                          <li><Link to="/delivery-partner/onboarding" className="dropdown-item">Onboarding</Link></li>
                        </ul>
                    )}
                </li>

                <li><Link to="/menu" className="nav-link">Menu</Link></li>
                <li><Link to="/analytics-report" className="nav-link">Analytics & Report</Link></li>
                <li><Link to="/marketing" className="nav-link">Marketing</Link></li>
                <li><Link to="/finance" className="nav-link">Finance</Link></li>
                <li><Link to="/staffs" className="nav-link">Staffs</Link></li>
                <li><Link to="/chat-support" className="nav-link">Chat & Support</Link></li>
                <li><Link to="/help-center" className="nav-link">Help Center</Link></li>
            </ul>
        </div>
    )
}

export default Sidebar