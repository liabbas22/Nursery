import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyPage = () => {
  const { navigate, backendURL, token, setCartItem ,cartItem} = useContext(ShopContext);
  const [searchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!token || !orderId) return;

        const response = await axios.post(
          backendURL + "/api/order/verifyStripe",
          { success, orderId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCartItem({});
           console.log("Cart should now be empty:", cartItem); 
          toast.success("Payment Successful!");
          navigate("/order");
        } else {
          toast.error("Payment Failed try Agian...");
          navigate("/cart");
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        navigate("/cart");
      }
    };

    verifyPayment();
  }, [success, orderId, token]);

  return <div>Verifying payment...</div>;
};

export default VerifyPage;
