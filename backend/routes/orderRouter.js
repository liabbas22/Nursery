import express, { Router } from "express";
import {
  placeOrder,
  placeOrderStripe,
  placeOrderRozorPay,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
  verifyRazorPay,
} from "../controllers/orderContoller.js";
import adminAuth from "../models/adminAuth.js";
import authUser from "../middleware/Auth.js";
import orderModel from "../models/orderModel.js";

const orderRouter = express.Router();

// Admin: Get all orders
orderRouter.post("/list", adminAuth, async (req, res) => {
  try {
    const orders = await orderModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Order List Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Admin: Update order status
orderRouter.post("/status", adminAuth, updateStatus);

// User: Place orders
orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/stripe", authUser, placeOrderStripe);
orderRouter.post("/razorpay", authUser, placeOrderRozorPay);

// User: Get their own orders
orderRouter.post("/userorders", authUser, userOrders);

// verfiy Strepi
orderRouter.post("/verifyStripe", authUser, verifyStripe);

// verfiy RazorPay
orderRouter.post("/verifyRazorpay", authUser, verifyRazorPay);

orderRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteOrder = await orderModel.findByIdAndDelete(id);
    if (!deleteOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found."
      });
    }
    res.json({ success: true, message: "Order deleted successfully." })
  } catch (error) {
    res.status(500).json({ success: false, message: "There was an issue while attempting to delete the order." })
    console.log("Error Delete Order", error)
  }
})
export default orderRouter;
