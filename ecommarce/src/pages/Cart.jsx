import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import CartTotal from "../component/CartTotal";

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [navigate])
  useEffect(() => {
    const tempData = [];
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItem]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData?.map((item, index) => {
          const ProductData = products.find(
            (product) => product._id === item._id
          );
          if (!ProductData) return null;

          return (
            <div
              className="py-4 border-t border-b text-gray-700 grid 
            grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4 "
              key={index}
            >
              <div className="flex items-start gap-6">
                <img
                  src={ProductData.images[0]}
                  alt={ProductData.name}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {ProductData.name}
                  </p>
                  <div className="flex item-center gap-5 mt-2">
                    <p className="mt-1 font-semibold">
                      {currency}
                      {ProductData.price}
                    </p>
                  </div>
                </div>
              </div>
              <input
                type="number"
                min={1}
                defaultValue={item.quantity}
                className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                      item._id,
                      item.size,
                      Number(e.target.value)
                    )
                }
              />
              <img
                src={assets.bin_icon}
                alt="Bin Icon"
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                onClick={() => updateQuantity(item._id, item.size, 0)}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              className="bg-black text-white text-sm my-8 px-8 py-3 uppercase rounded-sm
             active:bg-gray-900"
              onClick={() => navigate("/place-order")}
            >
              Proceed To checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
