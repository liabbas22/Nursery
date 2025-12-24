import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from 'framer-motion';

const BestSaller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 10));
  }, [products]);

  const swiperConfig = {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: { clickable: true },
    autoplay: { delay: 4000, disableOnInteraction: false },
    breakpoints: {
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
    modules: [Pagination, Autoplay],
  };

  return (
    <div className="my-10">
      {/* Title */}
      <motion.div
        className="text-center py-8 text-2xl md:text-3xl"
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
          Discover our most-loved plants and gardening essentials, cherished by plant enthusiasts for their quality, beauty, and easy care.
        </p>
      </motion.div>

      {/* Products */}
      {bestSeller.length > 0 && (
        <Swiper {...swiperConfig}>
          {bestSeller.map((product, index) => (
            <SwiperSlide key={product._id} className="flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
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
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BestSaller;
