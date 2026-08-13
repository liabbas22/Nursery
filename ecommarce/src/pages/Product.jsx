import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProduct  from "../component/Releated_Product";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [Image, setImage] = useState(null);
const fetchProductData = useCallback(() => {
  const foundProduct = products.find(
    (item) => item._id === productId
  );

  if (foundProduct) {
    setProductData(foundProduct);
    setImage(foundProduct.images?.[0] || "");
  }
}, [products, productId]);

useEffect(() => {
  fetchProductData();

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [fetchProductData]);
  return productData ? (
    <div className="pt-10 transition-opacity duration-500 ease-in border-t-2 opacity-100">
      <div className="flex flex-col gap-12 sm:flex-row">
        <div className="flex flex-col-reverse flex-1 gap-3 sm:flex-row">
          <div
            className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll
           justify-between sm:justify-normal w-full  sm:w-[18.7%]"
          >
            {productData.images?.map((image, index) => (
              <img
                src={image}
                alt="Prodcut_Image"
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(image)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img src={Image} alt="Product_image" className="w-full h-auto" />
          </div>
        </div>
        <div className="flex-1">
          <h1 className="mb-2 text-2xl font-medium">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img src={assets.star_icon} alt="star-icon" className="w-3.5" />
            <img
              src={assets.star_dull_icon}
              alt="star-icon"
              className="w-3.5"
            />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-semibold">
            {currency} {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <button
            className="px-8 py-3 text-sm text-white uppercase bg-green-700 hover:bg-green-600 active:bg-gray-700 "
            onClick={() => addToCart(productData._id)}
          >
            Add To Cart
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="flex flex-col gap-1 mt-5 text-sm text-gray-500">
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* ----------Descripition-------------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="px-5 py-3 border">Descripition</b>
          <p className="px-5 py-3 border">Review(122)</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 px-6 py-6 text-sm text-gray-500 border">
        <p>
          An e-commerce website is an online platform that facilitates the
          buying and selling of products or services over the internet. It
          serves as a virtual marketplace where businesses and individuals can
          showcase their products, interact with customers, and conduct
          transactions without the need for a physical presence. E-commerce
          websites have gained immense popularity due to their convenience,
          accessibility, and the global reach they offer.
        </p>
        <p>
          E-commerce websites typically display products or services along with
          detailed descriptions, images, prices, and any available variations
          (e.g., sizes, colors). Each product usually has its own dedicated page
          with relevant information.
        </p>
      </div>

      {/* -----------------Releated Product-------------------------------------------------- */}
      {productData && (
        <RelatedProduct 
          category={productData.category}
          subCategory={productData.subCategory}
        />
      )}

    </div>
  ) : (
    <div className="opacity-0"></div> 
  );
};

export default Product;
