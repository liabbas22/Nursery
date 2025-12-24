import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../component/Title";
import Product from "../pages/Product";
import ProductItem from "./ProductItem";

const Releated_Product = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [releatedProduct, setReleatedProduct] = useState([]);
  useEffect(() => {
    let ProductCopy = [...products];
    if (products.length > 0) {
      ProductCopy = ProductCopy.filter((item) => item.category === category);
      ProductCopy = ProductCopy.filter(
        (item) => item.subCategory === subCategory
      );
    }
    setReleatedProduct(ProductCopy.slice(0, 5));
  }, [products]);

  return (
    <div className="my-24">
      <div className="text-3xl text-center py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {releatedProduct?.map((product, index) => (
          <div>
            <ProductItem
              key={index}
              id={product._id}
              name={product.name}
              image={product.images}
              price={product.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Releated_Product;
