import React, { useRef, useState } from "react";
import Title from "../component/Title";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [job, setJob] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, resume: e.target.files[0] }));
  };

  const fileInputRef = useRef(null);
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.resume) {
      toast.error("Please upload your resume.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("position", formData.position);
    formDataToSend.append("resume", formData.resume);

    try {
      await axios.post(`${backendUrl}/api/contact`, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Form submitted successfully!");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        position: "",
        coverLetter: "",
        resume: null,
      });

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Something went wrong! Please try again.");
    }
  };

  return (
    <div>
      <div className="pt-10 pb-5 text-2xl text-center border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <motion.div className="flex flex-col justify-center gap-10 my-10 md:flex-row mb-28"
      >
        <motion.img
          src={assets.contact_img}
          alt="Contact Image"
          className="w-full md:w-[480px]"
          initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} />
        <motion.div className="flex flex-col items-start justify-center gap-6" initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} >
          <b className="text-2xl font-semibold text-gray-600">Nursery Plants</b>
          <p className="text-gray-500">
           The Nursery Plants Main Shaheed-e-Millat Rd, near Tipu Sultan Road<br />
            opposite Amir Khusro Road, Cp & Berar Chs, Karachi,
          </p>

          <p className="text-gray-500">
            Tel: (+92) 3043134587 <br />
            Email: nurseryplants@gmail.com
          </p>

          <b className="text-2xl font-semibold text-gray-600">
            Careers at Forever
          </b>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>

          <button
            className="hover:bg-green-700 hover:border-none hover:text-white px-6 py-3.5 rounded-sm border border-gray-950 transition duration-300 ease-in-out"
            onClick={() => setJob(!job)}
          >
            Explore Jobs
          </button>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {job && (
          <motion.form
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            onSubmit={handleSubmit}
            className="max-w-2xl p-8 mx-auto mb-10 bg-white border border-gray-200 shadow-lg rounded-2xl"
          >
            <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">
              Job Application Form
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Full Name */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  className="border rounded-lg px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                  className="border rounded-lg px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                  className="border rounded-lg px-4 py-2.5 bg-gray-50 focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>

              {/* Position */}
              <div className="flex flex-col gap-2">
                <label className="font-sans font-medium text-gray-700">
                  Position Applying For
                </label>
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  required
                  className="border rounded-lg px-4 py-2.5 bg-gray-50 text-gray-600 focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Select a position</option>
                  <option value="ecommerce-manager">E-Commerce Manager</option>
                  <option value="catalog-specialist">Product Catalog Specialist</option>
                  <option value="customer-support">Customer Support Executive</option>
                  <option value="digital-marketing">Digital Marketing Specialist</option>
                  <option value="social-media-manager">Social Media Manager</option>
                  <option value="seo-specialist">SEO Specialist</option>
                  <option value="plant-care-specialist">Plant Care Specialist / Horticulturist</option>
                  <option value="sales-executive">Sales Executive / Account Manager</option>
                  <option value="graphic-designer">Graphic Designer</option>

                </select>
              </div>

              {/* Resume */}
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-sans font-medium text-gray-700">
                  Upload Resume
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  required
                  className="px-4 py-3 border rounded-lg outline-none bg-gray-50 focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 text-lg font-medium text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-700"
                >
                  Submit Application
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contact;
