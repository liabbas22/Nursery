import mongoose from "mongoose";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "../utils/stripe.js";


const currency = "pkr";
const deliveryCharge = 100;
// ----------------------
// Place Order - Cash on Delivery
// ----------------------
const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount: Number(amount),
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: { name: item.name },
        unit_amount: Math.round(Number(item.price) * 100),
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency,
        product_data: { name: "Delivery Charges" },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

const frontendURL = process.env.FRONTEND_URL || origin;

const session = await stripe.checkout.sessions.create({
  payment_method_types: ["card"],
  line_items,
  mode: "payment",

  metadata: {
    orderId: newOrder._id.toString(),
    userId: userId.toString(),
  },

  success_url:
    `${frontendURL}/verify?session_id={CHECKOUT_SESSION_ID}`,

  cancel_url:
    `${frontendURL}/verify?success=false&orderId=${newOrder._id}`,
});

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------
// Verify Stripe
// ----------------------
const verifyStripe = async (req, res) => {
  try {
    const {
      sessionId,
      orderId,
      success,
      userId,
    } = req.body;

    // Stripe Checkout cancel hone par unpaid order delete karein
    if (success === "false" && orderId) {
      await orderModel.findOneAndDelete({
        _id: orderId,
        userId,
        payment: false,
      });

      return res.json({
        success: false,
        message: "Payment was cancelled",
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        success: false,
        message: "Stripe session ID is required",
      });
    }

    // Actual payment status Stripe se retrieve karein
    const session =
      await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return res.status(400).json({
        success: false,
        message: "Payment has not been completed",
      });
    }

    const sessionOrderId = session.metadata?.orderId;
    const sessionUserId = session.metadata?.userId;

    if (!sessionOrderId || !sessionUserId) {
      return res.status(400).json({
        success: false,
        message: "Stripe session metadata is missing",
      });
    }

    // Logged-in user aur Stripe session user same hone chahiye
    if (String(sessionUserId) !== String(userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized for this payment",
      });
    }

    const updatedOrder =
      await orderModel.findOneAndUpdate(
        {
          _id: sessionOrderId,
          userId,
        },
        {
          payment: true,
        },
        {
          new: true,
        }
      );

    if (!updatedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await userModel.findByIdAndUpdate(userId, {
      cartData: {},
    });

    return res.json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    console.error("Stripe verification error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ----------------------
// Get All Orders (Admin)
// ----------------------
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find().sort({createdAt: -1});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------
// Get Orders by User
// ----------------------
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------
// Update Order Status
// ----------------------
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order ID" });
    }

    const updated = await orderModel.findByIdAndUpdate(orderId, { status });

    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ----------------------
// Export All Controllers
// ----------------------
export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
