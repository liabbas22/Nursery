import axios from "axios";
import { useState } from "react";
import { backendURL } from "../App.js";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleSumbit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${backendURL}/api/user/admin`,
      { email, password }
    );

    setToken(response.data.token);
    toast.success(response.data.message || "Admin Login Successfully!");

  } catch (error) {
    if (error.response?.status === 401) {
      toast.error("Invalid email or password. Please try again.");
    } else {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  }
};


  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="max-w-md px-8 py-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-4 text-2xl font-bold">Admin Panel</h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">
              Email Address
            </p>
            <input
              type="email"
              placeholder="your@gmail.com"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="mb-2 text-sm font-medium text-gray-700">Password</p>
            <input
              type="password"
              placeholder="Enter Your Password"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md outline-none"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 mt-2 text-white bg-black rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
