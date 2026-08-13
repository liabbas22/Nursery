import React, { useContext, useState } from "react";
import Title from "../component/Title";
import CartTotal from "../component/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";

const PlaceOrder = () => {
  const {
    navigate,
    backendURL,
    token,
    cartItem,
    setCartItem,
    getCartAmount,
    delivery_Fee,
    products,
  } = useContext(ShopContext);
  const [method, setMetod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSumbitHandler = async (e) => {
    e.preventDefault();
    if (!token) {
      toast.error("Please login before placing an order.")
      navigate('/login')
      return;
    }
    try {
      const orderItems = [];

      for (const items in cartItem) {
        for (const item in cartItem[items]) {
          if (cartItem[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItem[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_Fee,
      };
      switch (method) {
        case "cod":
          const responed = await axios.post(
            backendURL + "/api/order/place",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (responed.data.success) {
            setCartItem({});
            toast.success("Payment Successfuly!");
            navigate("/order");
          } else {
            toast.error(responed.error.message);
            console.log(responed.error.message);
          }
          break;
        case "stripe":
          const responseStripe = await axios.post(
            backendURL + "/api/order/stripe",
            orderData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url);
          } else {
            toast.error(responseStripe.data.message);
          }
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form
      className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[70vh] border-t"
      onSubmit={onSumbitHandler}
    >
      {/* -----------------Left Side---------------------------- */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="my-3 text-xl sm:text-2xl">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="First Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            required
          />
        </div>
        <input
          type="email"
          placeholder="Email Address Here...."
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          required
        />
        <input
          type="text"
          placeholder="Street"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          required
        />
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="City"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            required
          />
          <input
            type="text"
            placeholder="State"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            required
          />
        </div>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder="Zip Code"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            required
          />
          <input
            type="text"
            placeholder="Country"
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            required
          />
        </div>
        <input
          type="number"
          placeholder="Phone"
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          required
        />
      </div>
      {/* ------------------Right Side------------------------ */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12 text-xl">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          <div className="flex flex-col gap-3 lg:flex-row">
            <div
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
              onClick={() => setMetod("stripe")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""
                  }`}
              ></p>
              <img
                src={assets.stripe_logo}
                alt="strapi logo"
                className="h-5 mx-4"
              />
            </div>
            <div
              className="flex items-center gap-3 p-2 px-3 border cursor-pointer"
              onClick={() => setMetod("cod")}
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full  ${method === "cod" ? "bg-green-400" : ""
                  }`}
              ></p>
              <p className="mx-4 text-sm font-medium text-gray-500 uppercase">
                Cash on Delivery
              </p>
            </div>
          </div>
          <div className="w-full mt-8 text-end">
            <button
              className="px-16 py-3 text-sm text-white bg-black active:bg-gray-900"
              type="sumbit"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
