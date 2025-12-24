import React, { useEffect, useState } from "react";
import { backendURL, currency } from "../App";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Order = ({ token, setToken }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const Navigate = useNavigate();
  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${backendURL}/api/order/list`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message || "Could not fetch orders.");
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    setUpdatingId(orderId);

    const updatedOrders = orders.map((order) =>
      order._id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    try {
      const response = await axios.post(
        `${backendURL}/api/order/status`,
        { orderId, status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success("Order status updated...");
      } else {
        throw new Error(response.data.message || "Status update failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: order.status } : order
        )
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleOrderDelete = async (id) => {
    toast.info(
      <div className="flex flex-col gap-3">
        <span>Are you sure you want to delete this Order?</span>
        <div className="flex gap-3">
          <button onClick={async () => {
            try {
              const res = await axios.delete(`${backendURL}/api/order/${id}`);
              toast.dismiss()
              toast.success(res?.data?.message || "Order deleted successfully.");

              fetchAllOrders()
            } catch (error) {
              const message =
                error?.response?.data?.message || "There was an issue while deleting the order.";
              toast.error(message);
              console.error("Error deleting order:", message);
            }
          }} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500">Yes</button>
          <button onClick={() => toast.dismiss()} className="bg-gray-300  text-white px-3 py-1 rounded-md hover:bg-gray-400">No</button>
        </div>
      </div>, { autoClose: false }
    )

  };

  useEffect(() => {
    if (token) fetchAllOrders();
  }, [token]);

  console.log("token",token);
// Extra Code 401 || 403
  // if (!token) {
  //   toast.error("Token expired. Please login again.")
  //   setToken("");
  //   localStorage.removeItem("token");
  //   Navigate('/');
  //   return
  // }

  return (
    <div>
      <h3>Order Page</h3>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-transparent">
          <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
        </div>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="relative grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start
            border-2 border-gray-200 p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700"
          >
            <img src={assets.parcel_icon} alt="Parcel Icon" className="w-12" />

            <div>
              <div>
                <strong>Items:</strong>
                {order.items.map((item, idx) => (
                  <p key={idx} className="py-0.5">
                    {item.name} x {item.quantity}
                    {idx !== order.items.length - 1 && ","}
                  </p>
                ))}
              </div>

              <div className="mt-3 mb-2 font-medium">
                <strong>Customer:</strong> {order.address?.firstName}{" "}
                {order.address?.lastName}
              </div>

              <div>
                <strong>Address:</strong>
                <p>{order.address?.street}</p>
                <p>
                  {order.address?.city}, {order.address?.state},{" "}
                  {order.address?.country} - {order.address?.zipcode}
                </p>
              </div>
              <p>{order.address?.phone}</p>
            </div>

            <div>
              <p className="text-sm sm:text-[15px]">
                Items : {order.items.length}
              </p>
              <p className="mt-3">Method : {order.paymentMethod}</p>
              <p>Payment : {order.payment ? "Done" : "Pending"}</p>
              <p>Date : {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <p className="text-sm sm:text-[15px]">
              {currency}
              {order.amount}
            </p>

            <select
              className="p-2 font-semibold border rounded"
              value={order.status}
              onChange={(event) => statusHandler(event, order._id)}
              disabled={updatingId === order._id}
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out of delivery">Out of delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
            <button
              onClick={() => handleOrderDelete(order._id)}
              className="
    absolute top-6 sm:top-auto sm:bottom-6 right-8
    flex items-center justify-center
    w-10 h-10
    border-2 border-gray-600
    rounded-full
    bg-gray-50 text-gray-600
    hover:bg-gray-200 hover:text-gray-700
    transition-colors duration-300 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-1
  "
              aria-label="Delete Order"
            >
              <MdDeleteOutline className="text-2xl" />
            </button>



          </div>
        ))
      )}
    </div>
  );
};

export default Order;
