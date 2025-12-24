import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  
  const {
    token,
    setToken,
    navigate,
    backendURL,
    currentState,
    setCurrentState,
  } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasseord] = useState("");
  const onHandleSumbit = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const responed = await axios.post(backendURL + "/api/user/register", {
          name,
          email,
          password,
        });
        if (responed.data.success) {
          setToken(responed.data.token);
          localStorage.setItem("token", responed.data.token);
          toast.success("You Sign Up Successfully");
        } else {
          toast.error(responed.data.message);
        }
      } else {
        const responed = await axios.post(backendURL + "/api/user/login", {
          email,
          password,
        });
        if (responed.data.success) {
          setToken(responed.data.token);
          localStorage.setItem("token", responed.data.token);
          toast.success("You Login Successfully");
        } else {
          toast.error(responed.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
    }
  }, [token]);
  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      onSubmit={onHandleSumbit}
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="text-3xl prata-regular">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          type="text"
          className="w-full px-3 rounded-sm py-2 border border-gray-600 "
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}

      <input
        type="email"
        className="w-full px-3 rounded-sm py-2 border border-gray-600 "
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        className="w-full px-3 rounded-sm py-2 border border-gray-600 "
        placeholder="Password"
        required
        onChange={(e) => setPasseord(e.target.value)}
        value={password}
      />
      <div className="w-full flex justify-between items-center text-sm mt-[-8px]">
        <p className="cursor-pointer" onClick={()=>navigate('/forget-password')}>Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Sign Up")}
          >
            Create account
          </p>
        ) : (
          <p
            className="cursor-pointer"
            onClick={() => setCurrentState("Login")}
          >
            Login Here
          </p>
        )}
      </div>
      <button
        className="bg-black text-white font-light px-8 py-2 mt-4 rounded-sm"
        type="submit"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
