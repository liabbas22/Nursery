import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../component/Title";
import ProductItem from "../component/ProductItem";
import { motion } from "framer-motion";

const Collaction = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortType, setSortType] = useState("relavent");

  const toggleCategories = (e) => {
    setCategory((prev) =>
      prev.includes(e.target.value)
        ? prev.filter((c) => c !== e.target.value)
        : [...prev, e.target.value]
    );
  };
useEffect(() => {
  const applyFilters = () => {
    let list = [...products];

    if (category.length > 0) {
      list = list.filter((item) =>
        category.includes(item.category)
      );
    }

    if (search && showSearch) {
      const normalizedSearch = search.toLowerCase();

      list = list.filter((item) =>
        item.name
          ?.toLowerCase()
          .includes(normalizedSearch)
      );
    }

    if (sortType === "low-high") {
      list.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortType === "high-low") {
      list.sort((a, b) => Number(b.price) - Number(a.price));
    } else {
      list.sort((a, b) =>
        String(b._id).localeCompare(String(a._id))
      );
    }

    setFilters(list);
    setLoading(false);
  };

  if (products.length > 0) {
    applyFilters();
  } else {
    setFilters([]);
    setLoading(false);
  }
}, [products, category, search, showSearch, sortType]);

  return (
    <div className="flex flex-col gap-1 pt-10 border-t sm:flex-row md:gap-10">
      <div className="min-w-60">
        <p
          className="flex items-center gap-2 my-2 uppercase cursor-pointer text-md md:text-xl"
          onClick={() => setShowFilter(!showFilter)}
        >
          Filters
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className="mb-3 text-sm font-medium uppercase">Category</p>
          <label className="flex gap-2"><input type="checkbox" value="Cactus" onChange={toggleCategories} />Cactus</label>
          <label className="flex gap-2"><input type="checkbox" value="Fruit" onChange={toggleCategories} />Fruit Plants</label>
          <label className="flex gap-2"><input type="checkbox" value="Herbs" onChange={toggleCategories} />Herbs</label>
          <label className="flex gap-2"><input type="checkbox" value="Imported" onChange={toggleCategories} />Imported Plants</label>
          <label className="flex gap-2"><input type="checkbox" value="Tree" onChange={toggleCategories} />Tree Plant</label>
          <label className="flex gap-2"><input type="checkbox" value="Creeper" onChange={toggleCategories} />Creeper</label>
          <label className="flex gap-2"><input type="checkbox" value="Hanging" onChange={toggleCategories} />Hanging Plants</label>
          <label className="flex gap-2"><input type="checkbox" value="Indoor" onChange={toggleCategories} />Indoor Plants</label>
        </div>

      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-4 text-base sm:text-xl lg:text-2xl">
          <Title text1="ALL" text2=" COLLECTIONS" />
          <select
            className="border-2 border-gray-300 text-sm px-2 mt-[-10px]"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relavent" >Sort by: Relevant</option>
            <option value="low-high" >Sort by: Low To High</option>
            <option value="high-low">Sort by: High To Low</option>
          </select>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-900 rounded-full border-t-white animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
            {filters.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <ProductItem id={product._id} {...product} image={product.images} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaction;
