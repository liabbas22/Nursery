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
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer group block">
      <div className="relative w-full bg-white flex items-center justify-center overflow-hidden rounded-sm">
        <img
          src={Array.isArray(image) ? image[0] : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110"
        />
        <button
          className="absolute bottom-0 w-full bg-green-700 hover:bg-green-600 text-white px-3 py-2 text-center 
                     rounded-sm transform translate-y-full opacity-0 
                     transition-all duration-300 ease-in-out group-hover:translate-y-0 group-hover:opacity-100"
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
