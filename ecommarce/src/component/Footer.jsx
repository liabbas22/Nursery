import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
const Footer = () => {
  return (
    <motion.div
      className="mt-40 text-sm"
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10">
        <div>
          <Link to={"/"}>
            <img src={assets.logo} alt="logo" className="w-24 " />
          </Link>
          <p className="w-full text-gray-600 md:w-2/3">
            Bringing you the healthiest plants, premium gardening supplies, and
            a nurturing shopping experience. Loved by plant enthusiasts
            everywhere — shop with confidence and grow your green paradise.
          </p>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/about"}>About Us</Link>
            </li>
            <li>
              <Link to={"/delivery"}>Delivery</Link>
            </li>
            <li>
              <Link to={"/policy"}>Privacy Policy</Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-5 text-xl font-medium">Get in Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+923043134587</li>
            <li>nurseryplant@gmail.com</li>
            <li>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr className="border-gray-300" />
      <p className="py-5 text-xs text-center text-gray-600 sm:text-sm">
        © 2026 nurseryplants.com – All Rights Reserved.
      </p>
    </motion.div>
  );
};

export default Footer;
