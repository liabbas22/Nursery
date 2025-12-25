import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import Add from "./page/Add.jsx";
import List from "./page/List.jsx";
import Order from "./page/Order.jsx";
import Login from "./component/Login.jsx";
import { ToastContainer } from "react-toastify";
import ContactJob from "./page/ContactJob.jsx";
import AddHeroSection from "./page/AddHeroSection.jsx";
import Herolist from "./page/Herolist.jsx";
export const backendURL = process.env.REACT_APP_BACKEND_URL;
export const currency = "Rs ";
const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <>
          <Navbar setToken={setToken} />
          <hr />
          <div className="flex w-full">
            <Sidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25pxs)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/add" element={<Add token={token} />}></Route>
                <Route path="/list" element={<List token={token} />}></Route>
                <Route path="/orders" element={<Order token={token} setToken={setToken} />}></Route>
                <Route path="/contact-job" element={<ContactJob token={token} />}></Route>
                <Route path="/add-hero-section" element={<AddHeroSection />} token={token}></Route>
                <Route path="/hero-sec-list" element={<Herolist />} token={token}></Route>
              </Routes>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
