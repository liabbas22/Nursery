import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItem,
    Scroll,
    setScroll
  } = useContext(ShopContext);

  const logout = () => {
    if (token) {
      navigate("/login");
      localStorage.removeItem("token");
      setToken("");
      setCartItem({});
      toast.success("Logout successful. Thank you for visiting!");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`
        sticky top-0 flex items-center justify-between w-full bg-white font-medium
        px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-5 z-[50]
        transition-all duration-500 ease-in-out
        ${Scroll ? "shadow-md" : "shadow-none"}
      `}
    >
      <Link to={"/"}>
        <img src={logo} alt="" className="w-16 sm:w-20 cursor-pointer outline-none mt-[-3px]" />
      </Link>

      <ul className="hidden sm:flex gap-5 items-center text-md text-gray-700">
        {["Home", "Collection", "About", "Contact"].map((item) => (
          <NavLink
            key={item}
            to={`/${item === "Home" ? "" : item.toLowerCase()}`}
            className="flex flex-col gap-1 items-center"
          >
            <p>{item}</p>
            <hr className="w-2/3 border-none h-[1.5px] bg-gray-700 hidden" />
          </NavLink>
        ))}
      </ul>

      <div className="flex items-center gap-4 sm:gap-6">
        <Link to={"/collection"}>
          <img
            src={assets.search_icon}
            alt="Search Navbar"
            className="w-5 cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        </Link>

        {/* Profile Dropdown */}
        <div
          className="relative"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <Link to={"/login"}>
            <img
              src={assets.profile_icon}
              alt="profile icon"
              className="w-5 cursor-pointer"
              onClick={() => {
                if (token) toast.success("You are already signed in.");
                else navigate("/login");
              }}
            />
          </Link>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                className="absolute right-0 mt-2 w-36 bg-slate-100 text-gray-500 rounded shadow-lg overflow-hidden z-[9999]"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <div className="flex flex-col gap-2 py-3 px-5">
                  <p
                    className="cursor-pointer hover:text-black"
                    onClick={() => navigate("/order")}
                  >
                    Orders
                  </p>
                  <p className="cursor-pointer hover:text-black" onClick={logout}>
                    Logout
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart */}
        <Link to={"/cart"} className="relative">
          <img src={assets.cart_icon} alt="cart Icon" className="w-5 min-w-5" />
          <p
            className="absolute bottom-[-5px] right-[-5px] w-4 text-center leading-4
             bg-green-700 rounded-full text-white aspect-square text-[10px]"
          >
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu */}
        <img
          src={assets.menu_icon}
          alt="Menu Icon"
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
        />

        <div
          className={`fixed top-0 right-0 h-full bg-white z-[999] transition-all duration-500 overflow-hidden 
            ${visible ? "w-full" : "w-0"}`}
        >
          <div className="flex flex-col text-gray-600">
            <div
              className="flex items-center gap-2 p-3 cursor-pointer text-sm"
              onClick={() => setVisible(false)}
            >
              <img
                src={assets.dropdown_icon}
                alt="dropdown_icon"
                className="h-4 rotate-180"
              />
              <p>Back</p>
            </div>
            {["Home", "Collection", "About", "Contact"].map((item) => (
              <NavLink
                key={item}
                className="py-3 pl-6 border uppercase"
                to={`/${item === "Home" ? "" : item.toLowerCase()}`}
                onClick={() => setVisible(false)}
              >
                {item}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
