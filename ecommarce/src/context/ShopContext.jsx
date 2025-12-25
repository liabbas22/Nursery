import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItem, setCartItem] = useState({});
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [currentState, setCurrentState] = useState("Login");
  const [loading, setLoading] = useState(false);
  const [Scroll, setScroll] = useState(false);

  useEffect(() => {
    getProductsData();
  }, []);
  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken && !token) {
      setToken(localToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const addToCart = async (itemId, size = "default") => {
    if (!itemId) return;
    const cartData = structuredClone(cartItem) || {};

    if (!cartData[itemId]) cartData[itemId] = {};

    if (cartData[itemId][size]) {
      cartData[itemId][size] += 1;
    } else {
      cartData[itemId][size] = 1;
    }

    setCartItem(cartData);
    toast.success("Added to cart");

    if (!token) return;

    try {
      await axios.post(
        `${backendURL}/api/cart/add`,
        { itemId, size },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message);
    }
  };



  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalCount += cartItem[items][item];
          }
        } catch (error) {
          console.log("Error in GetCartCount", error);
        }
      }
    }
    return totalCount;
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let CartData = structuredClone(cartItem);
    if (!CartData[itemId]) {
      CartData[itemId] = {};
    }
    CartData[itemId][size] = quantity;
    setCartItem(CartData);
    if (token) {
      try {
        await axios.post(
          backendURL + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItem) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItem[items]) {
        try {
          if (cartItem[items][item] > 0) {
            totalAmount += itemInfo.price * cartItem[items][item];
          }
        } catch (error) {
          console.log("GetCartAmount Error", error);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    setLoading(true)
    try {
      const rersponed = await axios.get(backendURL + "/api/product/list");
      if (rersponed.data.success) {
        setProducts(rersponed.data.message);
      } else {
        toast.error(rersponed.data.message);
      }
    } catch (error) {
      console.log(error);
      if (error?.code === 'ERR_NETWORK') {
        toast.error("Unable to connect to the server. Please check your internet connection or try again later.");
        return;
      }
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };
  const getUserCart = async (token) => {
    try {
      const responed = await axios.post(
        backendURL + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (responed.data.success) {
        setCartItem(responed.data.cartData);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Session expired. Please login again.");
        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
      }
      console.log(error);
      if (error?.code === 'ERR_NETWORK') {
        toast.error("Unable to connect to the server. Please check your internet connection or try again later.");
        return;
      }
      toast.error(error.message);
    }
  };

  const currency = "$";
  const delivery_Fee = 10;
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const value = {
    products,
    currency,
    delivery_Fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItem,
    setCartItem,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendURL,
    token,
    setToken,
    currentState,
    setCurrentState,
    Scroll, setScroll
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
