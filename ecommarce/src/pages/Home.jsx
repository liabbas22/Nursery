import React from "react";
import { motion } from "framer-motion";

import HeroSection from "../component/Herosection";
import LastestCollection from "../component/LastestCollection";
import BestSaller from "../component/BestSaller";
import OurPolicy from "../component/OurPolicy";
import NewsLetter from "../component/NewsLetter";
import ProductCategory from "../component/ProductCategory";


const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />,
      <LastestCollection />,
      <BestSaller />,
      <ProductCategory />,
      <OurPolicy />,
      <NewsLetter />,
    </div>
  );
};

export default Home;
