import React from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../component/NewsLetter";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        {/* Left Image */}
        <motion.img
          src={assets.about_img}
          alt="About Image"
          className="w-full md:max-w-[450px]"
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />

        {/* Right Text */}
        <motion.div
          className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600"
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p>
            Pure Plants Nursery was founded with a passion for greenery and a
            desire to bring nature closer to your home and garden. Our journey
            began with the goal of offering high-quality plants that are healthy,
            vibrant, and easy to care for.
          </p>
          <p>
            We carefully source our plants from trusted growers, ensuring that
            each one is nurtured and maintained to the highest standards.
            Whether you're looking for indoor plants, fruit plants, herbs, or
            trees, we provide a wide variety to suit every gardening enthusiast.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            At Pure Plants Nursery, our mission is to make gardening accessible
            and enjoyable for everyone. We aim to provide not only quality
            plants but also guidance, tips, and inspiration to help you create
            your perfect green space.
          </p>
        </motion.div>
      </div>

      <div className="text-3xl py-8">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      {/* Why Choose Us Boxes */}
      <div className="flex flex-col md:flex-row items-center text-sm mb-20 gap-6">
        {[
          {
            title: "Healthy & Quality Plants:",
            desc: "Every plant is carefully nurtured and hand-selected to ensure it thrives in your home or garden.",
          },
          {
            title: "Wide Variety:",
            desc: "From indoor greenery and herbs to fruit plants and trees, we offer a diverse selection for every gardener.",
          },
          {
            title: "Expert Guidance & Support:",
            desc: "Our knowledgeable team is ready to assist you with planting tips, care instructions, and advice to help your plants flourish.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
          >
            <b>{item.title}</b>
            <p className="text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
