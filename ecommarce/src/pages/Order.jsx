import React, { useCallback, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Order = () => {
  const { currency, token, backendURL } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);

const loadOrderData = useCallback(async () => {
  if (!token) {
    setOrderData([]);
    setLoading(false);
    return;
  }

  setLoading(true);

  try {
    const response = await axios.post(
      `${backendURL}/api/order/userorders`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      const allOrderItems = [];

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
    } else {
      toast.error(
        response.data.message || "Unable to load orders"
      );
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        error.message ||
        "Unable to load orders"
    );
  } finally {
    setLoading(false);
  }
}, [token, backendURL]);

useEffect(() => {
  loadOrderData();
}, [loadOrderData]);

  return (
    <motion.div
      className="px-4 pt-12 border-t sm:px-6 lg:px-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-8 text-2xl sm:text-3xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Title text1="MY" text2="ORDERS" />
      </motion.div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 border-4 border-blue-900 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {orderData.slice(0, 8).map((item, index) => (
            <motion.div
              key={index}
              className="p-4 transition-all duration-300 bg-white border rounded-lg shadow-sm sm:p-6 hover:shadow-md"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                {/* Left */}
                <div className="flex gap-4 sm:gap-6">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="object-cover w-20 h-auto rounded-md sm:w-28"
                  />

                  <div className="space-y-1 text-sm sm:text-base">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-gray-600">
                      {currency}{" "}
                      {Number(item.price)} × {item.quantity}
                    </p>
                    <p className="text-sm text-gray-400">
                      {new Date(item.date).toDateString()}
                    </p>
                    <p className="text-sm text-gray-400">
                      Payment: {item.paymentMethod}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="flex justify-between gap-4 md:flex-col md:items-end">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    <p className="text-sm font-medium text-gray-700 sm:text-base">
                      {item.status}
                    </p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 text-sm transition-all duration-300 border border-green-800 rounded hover:bg-green-700 hover:text-white"
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
