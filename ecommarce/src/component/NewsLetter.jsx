import React from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const NewsLetter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.info("These Service is not available right now!");
  };
  return (
    <motion.div className="text-center" initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>

      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Subscribe now to get exclusive offers, latest product updates, and
        special discounts delivered to your inbox!
      </p>
      <form
        className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded"
        onSubmit={handleSubmit}
      >
        <input
          type="email"
          placeholder="Enter your email here..."
          className="flex-1 py-3 px-2 outline-none text-sm capitalize"
          required
        />
        <button
          type="submit"
          className="bg-green-700 text-white text-xs md:text-base px-6 py-3.5 uppercase hover:bg-green-600 transition"
        >
          Subscribe
        </button>
      </form>
    </motion.div>
  );
};

export default NewsLetter;
