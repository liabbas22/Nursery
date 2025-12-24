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


  const applyFilters = () => {
    let list = [...products];

    if (category.length) {
      list = list.filter((item) => category.includes(item.category));
    }


    if (search && showSearch) {
      list = list.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortType === "low-high") {
      list.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      list.sort((a, b) => b.price - a.price);
    } else {
      list.sort((a, b) => b._id.localeCompare(a._id));
    }

    setFilters(list);
    setLoading(false);
  };

  useEffect(() => {
    if (products.length > 0) {
      applyFilters();
    }
  }, [products, category, search, showSearch, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 md:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-md md:text-xl flex items-center uppercase cursor-pointer gap-2"
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
          <label className="flex gap-2"><input type="checkbox" value="Fruits" onChange={toggleCategories}/>Fresh Fruits</label>
          <label className="flex gap-2"><input type="checkbox" value="Flowers" onChange={toggleCategories} />New Flowers</label>
          <label className="flex gap-2"><input type="checkbox" value="Vegetable" onChange={toggleCategories} />Vegetable Plants</label>
        </div>

      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between text-base sm:text-xl lg:text-2xl mb-4">
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
            <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
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
