import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, name, image, price }) => {
  const { currency, addToCart } = useContext(ShopContext);

  const handleToAddCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!id) return;
    addToCart(id, "l");
  };

  return (
    <Link to={`/product/${id}`} className="block text-gray-700 cursor-pointer group">
      <div className="relative flex items-center justify-center w-full overflow-hidden bg-white rounded-sm">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="object-cover w-full h-full transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
        <button
          className="absolute bottom-0 w-full px-3 py-2 text-center text-white transition-all duration-300 ease-in-out transform translate-y-full bg-green-700 rounded-sm opacity-0 hover:bg-green-600 group-hover:translate-y-0 group-hover:opacity-100"
          onClick={handleToAddCart}
        >
          Quick Add
        </button>
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">
        {currency}{" "}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
