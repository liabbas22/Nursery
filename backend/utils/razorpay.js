import razorpay from "razorpay";

const razorpayInstance = new razorpay({
    key_id: process.env.Razorpay_Secret_Key,
    key_secret:process.env.Razorpay_Secret_Id
})
export default razorpayInstance;