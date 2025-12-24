import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { IoIosContacts } from "react-icons/io";
import { MdAddCard } from "react-icons/md";
import { MdBookmarkBorder } from "react-icons/md";
import { IoListCircleSharp } from "react-icons/io5";
const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-r-2">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          to={"/add"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <img src={assets.add_icon} alt="add icon" className="w-5 h-5" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          to={"/list"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <img src={assets.order_icon} alt="order icon" className="w-5 h-5" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          to={"/orders"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <span><MdBookmarkBorder className="w-6 h-6 text-gray-600" /></span>
          <p className="hidden md:block">Orders</p>
        </NavLink>

        <NavLink
          to={"/add-hero-section"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <span><MdAddCard className="w-6 h-6 text-gray-600" /></span>
          <p className="hidden md:block">Add Banner Sec</p>
        </NavLink>
        <NavLink
          to={"/hero-sec-list"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <span><IoListCircleSharp className="w-6 h-6 text-gray-600" /></span>
          <p className="hidden md:block">Banner List</p>
        </NavLink>

          <NavLink
          to={"/contact-job"}
          className={
            "flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l"
          }
        >
          <span><IoIosContacts className="w-6 h-6 text-gray-600" /></span>
          <p className="hidden md:block">Contact Job</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
