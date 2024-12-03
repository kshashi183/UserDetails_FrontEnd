import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog } from "react-icons/fa"; // Optional icons

function Sidebar() {
  return (
    <div className="sidebar  text-white" style={{ backgroundColor: "#6e787a" }}>
      <div className="sidebar-container">
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="/"
              style={{ textAlign: "left" }}
            >
              <FaHome /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-white"
              to="/user-details"
              style={{ textAlign: "left" }}
            >
              <FaUserAlt /> UserDetails
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
