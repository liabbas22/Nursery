import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const HeroSectionSlider = () => {
  const { backendURL } = useContext(ShopContext);
  const [banner, setBanner] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBannerData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${backendURL}/api/hero`);
      setBanner(res?.data?.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching banner");
    } finally {
      setLoading(false);
    }
  };
  console.log("Res", banner);

  useEffect(() => {
    fetchBannerData();
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!banner || banner.length === 0) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={0}
      slidesPerView={1}
      loop
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      className="w-full relative z-0"
    >
      {banner.slice(0, 7).map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="flex flex-col-reverse sm:flex-row items-center border border-gray-400">

            <motion.div
              className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 text-[#414141] space-y-4 px-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <p className="w-8 md:w-11 h-[1.5px] bg-green-700"></p>
              <p className="font-medium text-sm md:text-base uppercase text-center ">
                {slide.subtitle}
              </p>

              <motion.h1
                className="text-3xl lg:text-5xl leading-relaxed sm:py-3 text-center capitalize"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                {slide.title}
              </motion.h1>

              <Link to="/collection">
                <motion.div
                  className="flex items-center gap-2 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                >
                  <p className="font-semibold text-sm md:text-base hover:text-green-700 transition-all duration-300">
                    Shop Now
                  </p>
                  <p className="w-8 md:w-11 h-[1.5px] bg-green-700 transition-all duration-300 group-hover:w-16 md:group-hover:w-20"></p>
                </motion.div>
              </Link>
            </motion.div>
            <motion.img
              src={`${slide?.image}`}
              alt={slide.title}
              className="w-full h-[450px] object-cover sm:w-1/2"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSectionSlider;
