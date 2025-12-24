import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";

const LastestCollection = () => {
  const [latestProduct, setLatestProduct] = useState([]);
  const { products, loading } = useContext(ShopContext);

  useEffect(() => {
    if (products.length) {
      setLatestProduct(
        products
          .sort((a, b) => b._id.localeCompare(a._id))
          .slice(0, 10)
      );
    }
  }, [products]);

  return (
    <motion.div className="my-8 relative">
      <motion.div
        className="text-center py-8 text-2xl md'text-3xl"
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Title text1={"LATEST "} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
         Explore our newest selection of plants and greenery, carefully handpicked for plant lovers and garden enthusiasts.
        </p>
      </motion.div>

      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 z-50">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {latestProduct?.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            <ProductItem
              id={product._id}
              name={product.name}
              image={Array.isArray(product.images) ? product.images : [product.images]}
              price={product.price}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LastestCollection;
