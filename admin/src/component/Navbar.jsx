import React from "react";
import { assets } from "../assets/assets";
import { toast } from 'react-toastify'
import { Link } from "react-router-dom";
const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to="/" className="w-[max(5%,70px)]">
        <img
          src={assets.logo}
          alt="logo"
          
        />
      </Link>
      <button
        className="bg-gray-700 hover:bg-gray-800 text-white 
             px-5 py-2 sm:px-7 sm:py-2 
             rounded-full text-xs sm:text-sm 
             transition duration-300"
        onClick={() => {
          setToken("");
          localStorage.removeItem("token");
          toast.success("You have been logged out successfully.");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
