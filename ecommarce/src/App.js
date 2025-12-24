import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collaction from "./pages/Collaction";
import About from "./pages/About";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import SearchBar from "./component/SearchBar";
import { ToastContainer } from "react-toastify";
import VerifyPage from "./pages/VerifyPage";
import ForgetPassword from './pages/Forget'
import { motion } from "framer-motion";
import PageNotFound from "./pages/PageNotFound";
import { ShopContext } from "./context/ShopContext";

const App = () => {
  const bannerText = "Upto 50% OFF - Free Delivery all over Pakistan - Easy Return Policy";
  const { Scroll, setScroll } = useContext(ShopContext)
  return (
    <div>
      <div className="w-full overflow-hidden bg-green-700 text-white">
        <motion.div
          className="whitespace-nowrap py-2 px-4 inline-block"
          initial={{ x: "300%" }}
          animate={{ x: "-100%" }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          {bannerText}
        </motion.div>
      </div>
      <div className=''>
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <div className={`px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collaction />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/order" element={<Order />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<VerifyPage />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
