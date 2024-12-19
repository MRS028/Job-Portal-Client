import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../pages/Shared/Navbar";
import Footer from "../pages/Shared/Footer";

const Mainlayout = () => {
  return (
    <>
      <div className="">
        <div className="bg-base-300">
            <Navbar></Navbar>
        </div>
        
        <Outlet></Outlet>
      </div>

      <div className="bg-gray-300">
      <Footer></Footer>
      </div>
    </>
  );
};

export default Mainlayout;
