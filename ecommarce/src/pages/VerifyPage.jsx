import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const { navigate, backendURL, token, setCartItem } = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!token || (!sessionId && !orderId)) return;

        const response = await axios.post(
          backendURL + "/api/order/verifyStripe",
          { sessionId, success, orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCartItem({});
          toast.success("Payment Successful!");
          navigate("/order");
        } else {
          toast.error(response.data.message || "Payment failed. Please try again.");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Stripe verification error:", error);
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Payment verification failed"
        );
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [sessionId, success, orderId, token, backendURL, navigate, setCartItem]);

  return <div>Verifying payment...</div>;
};

export default VerifyPage;
