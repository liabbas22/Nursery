import React from "react";

import HeroSection from "../component/Herosection";
import LastestCollection from "../component/LastestCollection";
import BestSaller from "../component/BestSaller";
import OurPolicy from "../component/OurPolicy";
import ProductCategory from "../component/ProductCategory";


const Home = () => {
  return (
    <div className="overflow-hidden">
      <HeroSection />,
      <LastestCollection />,
      <BestSaller />,
      <ProductCategory />,
      <OurPolicy />,
    </div>
  );
};

export default Home;
