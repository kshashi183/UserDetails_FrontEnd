import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUserAlt, FaCog } from "react-icons/fa"; // Optional icons

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg  fixed-top"
      style={{ backgroundColor: "rgba(72, 83, 93, 1)" }}
    >
      <div className="container-fluid  ms-2">
        <Link className="navbar-brand" to="/" style={{ color: "white" }}>
          My App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/" style={{ color: "white" }}>
                <FaUserAlt /> User
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
