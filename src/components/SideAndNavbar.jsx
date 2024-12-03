import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const SideAndNavbar = () => {
  return (
    <div>
      <div className="app">
        <Navbar />
        <div className="main-container">
          <Sidebar />

          <div className=" mt-5 d-flex justify-content-center align-items-center w-100">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideAndNavbar;
