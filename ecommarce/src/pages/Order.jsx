import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Order = () => {
  const { currency, token, backendURL } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrderData = async () => {
    setLoading(true);
    try {
      if (!token) return;

      const response = await axios.post(
        `${backendURL}/api/order/userorders`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        let allOrderItems = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrderItems.push({
              ...item,
              status: order.status,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrderItems.reverse());
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <motion.div
      className="border-t pt-12 px-4 sm:px-6 lg:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-2xl sm:text-3xl mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1="MY" text2="ORDERS" />
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center py-24">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {orderData.slice(0, 8).map((item, index) => (
            <motion.div
              key={index}
              className="bg-white border rounded-lg p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                {/* Left */}
                <div className="flex gap-4 sm:gap-6">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-20 sm:w-28 h-auto  object-cover rounded-md"
                  />

                  <div className="space-y-1 text-sm sm:text-base">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">
                      {currency}{" "}
                      {Number(item.price)} × {item.quantity}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {new Date(item.date).toDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">
                      Payment: {item.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex md:flex-col justify-between md:items-end gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    <p className="text-sm sm:text-base font-medium text-gray-700">
                      {item.status}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border border-green-800 px-4 py-2 text-sm rounded hover:bg-green-700 hover:text-white transition-all duration-300"
                    onClick={loadOrderData}
                  >
                    Track Order
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Order;
