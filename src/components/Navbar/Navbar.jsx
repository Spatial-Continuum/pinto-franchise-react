import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/navbar.css'

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-right">
        <div className="navbar-icons">
          <span className="navbar-icon">🔔</span> {/* Notification icon */}
          <span className="navbar-icon">⚙️</span> {/* Settings icon */}
          <span className="navbar-icon">👤</span> {/* User profile icon */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
