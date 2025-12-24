import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
      className="mt-40 text-sm"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        <div>
          <Link to={"/"}>
            <img src={assets.logo} alt="logo" className=" w-24" />
          </Link>
          <p className="w-full md:w-2/3 text-gray-600">
            Bringing you the healthiest plants, premium gardening supplies,
            and a nurturing shopping experience. Loved by plant enthusiasts
            everywhere — shop with confidence and grow your green paradise.
          </p>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About Us</Link>
            </li>
            <li>
              <Link to={"/delivery"}>Delivery</Link>
            </li>
            <li>
              <Link to={"/policy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xl font-medium mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+923149283153</li>
            <li>aa1639987@gmail.com</li>
            <li>Instagram</li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300" />
      <p className="py-5 text-center text-gray-600 text-xs sm:text-sm">
        © 2025 Pure plants.com – All Rights Reserved.
      </p>
    </motion.div>
  );
};

export default Footer;
