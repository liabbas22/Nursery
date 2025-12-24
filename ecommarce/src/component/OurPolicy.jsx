import React from "react";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const policyItems = [
  {
    icon: assets.exchange_icon,
    title: "Easy Exchange Policy",
    desc: "We offer hassle free exchange policy",
  },
  {
    icon: assets.quality_icon,
    title: "7 Days Return Policy",
    desc: "We provide 7 days free return policy",
  },
  {
    icon: assets.support_img,
    title: "Best customer support",
    desc: "We provide 24/7 customer support",
  },
];

const OurPolicy = () => {
  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policyItems.map((item, index) => (
        <motion.div
          key={index}
          className="flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
        >
          <img src={item.icon} alt={item.title} className="w-12 mb-5" />
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-400">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default OurPolicy;
