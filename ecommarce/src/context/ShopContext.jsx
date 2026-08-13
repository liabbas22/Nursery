import { createContext, useCallback, useEffect, useState } from "react";
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


    const backendURL = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken && !token) {
      setToken(localToken);
    }
  }, [token]);

  
const getUserCart = useCallback(
  async (authToken) => {
    try {
      const response = await axios.post(
        `${backendURL}/api/cart/get`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        setCartItem(response.data.cartData || {});
      } else {
        toast.error(
          response.data.message || "Unable to load cart"
        );
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        toast.error(
          "Session expired. Please login again."
        );

        setToken("");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }

      if (error?.code === "ERR_NETWORK") {
        toast.error(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
        return;
      }

      console.error("Cart fetch error:", error);

      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Unable to load cart"
      );
    }
  },
  [navigate,backendURL]
);

  useEffect(() => {
    if (token) {
      getUserCart(token);
    }
  }, [token,getUserCart]);


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


useEffect(() => {
  const getProductsData = async () => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${backendURL}/api/product/list`
      );

      if (response.data.success) {
        setProducts(response.data.message || []);
      } else {
        toast.error(
          response.data.message || "Failed to fetch products"
        );
      }
    } catch (error) {
      console.error("Product fetch error:", error);

      if (error?.code === "ERR_NETWORK") {
        toast.error(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
      } else {
        toast.error(
          error?.response?.data?.message ||
            error.message ||
            "Failed to fetch products"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  getProductsData();
}, [backendURL]);





  const currency = "Rs";
  const delivery_Fee = 100;


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
    Scroll, setScroll,
    loading
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
export default ShopContextProvider;
