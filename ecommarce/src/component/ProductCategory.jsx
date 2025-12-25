import React, { useContext, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';

const ProductCategory = () => {
  const { products } = useContext(ShopContext);

  const categories = ["Cactus", "Herbs", "Tree"];

  const categoryProducts = useMemo(() => {
    if (!products.length) return {};
    const filtered = {};
    categories.forEach(category => {
      const filteredProducts = products
        .filter(p => p.category === category)
        .sort((a, b) => b._id.localeCompare(a._id))
        .slice(0, 10);
      if (filteredProducts.length > 0) filtered[category] = filteredProducts;
    });
    return filtered;
  }, [products]);

  const swiperConfig = {
    slidesPerView: 2,
    spaceBetween: 20,
    pagination: { clickable: true },
    breakpoints: {
      320: { slidesPerView: 1 },
      640: { slidesPerView: 3 },
      768: { slidesPerView: 4 },
      1024: { slidesPerView: 5 },
    },
    modules: [Pagination, Autoplay],
    autoplay: { delay: 3000, disableOnInteraction: false },
  };

  const categoryDescriptions = {
    "Cactus": "Handpicked cacti grown with care — perfect for indoor decoration, low maintenance, and a touch of green in every space.",
    "Herbs": "Fresh and fragrant herbs — ideal for cooking, teas, and home gardens, grown with care for your kitchen.",
    "Tree": "Beautiful trees for your garden or home — unique varieties that bring greenery and life to any space."
  };

  return (
    <section className="my-10">
      {categories.map(category => (
        categoryProducts[category] && (
          <div key={category} className="mb-10">
            <motion.div
              className="text-center py-8 text-2xl md:text-3xl"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <Title text1={category} text2="Latest Collection" />
              <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-700">
                {categoryDescriptions[category]}
              </p>
            </motion.div>

            <Swiper {...swiperConfig}>
              {categoryProducts[category].map((product, index) => (
                <SwiperSlide key={product._id} className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.15,
                      ease: "easeOut",
                    }}
                  >
                    <ProductItem
                      id={product._id}
                      name={product.name}
                      image={product.images ? (Array.isArray(product.images) ? product.images : [product.images]) : []}
                      price={product.price}
                    />
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )
      ))}
    </section>
  );
};

export default ProductCategory;
