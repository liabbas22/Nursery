import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const loaction = useLocation();
  useEffect(() => {
    if (loaction.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [loaction]);
  return showSearch && visible ? (
    <div className="text-center border-t border-b bg-gray-50">
      <div
        className="inline-flex items-center justify-center w-3/4 px-5 py-2 mx-3 my-5 border border-gray-400 rounded-full sm:w-1/2 "
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search"
          className="flex-1 text-sm outline-none bg-inherit"
        />
        <img src={assets.search_icon} alt="Search Icon" className="w-4" />
      </div>
      <img
        src={assets.cross_icon}
        alt="Cross Icon"
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
      />
    </div>
  ) : null;
};

export default SearchBar;
