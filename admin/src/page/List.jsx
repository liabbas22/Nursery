import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendURL, currency } from "../App";

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchList = async () => {
    setLoading(true)
    try {
      const responed = await axios.get(backendURL + "/api/product/list");

      if (responed.data.success) {
        setList(responed.data.message);
      } else {
        toast.error(responed.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  const removeProduct = async (id) => {
    toast.info(
      <div className="flex flex-col gap-3">
        <span>Are you sure you want to delete this application?</span>
        <div className="flex gap-3">
          <button onClick={async () => {
            try {
              const responed = await axios.post(
                backendURL + "/api/product/remove",
                { id },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              toast.dismiss();
              if (responed.data.success) {
                toast.success("Product Delete Successfullly!");
                await fetchList();
              } else {
                toast.error(responed.data.message);
              }
            } catch (error) {
              console.log(error);
              toast.error(error.message);
            }
          }} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500">Yes</button>
          <button onClick={() => toast.dismiss()}
            className="bg-gray-300 text-white px-3 py-1 rounded-md hover:bg-gray-400">No</button>
        </div>
      </div>,
      { autoClose: false }
    )


  };
  return (
    <>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        <div
          className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 
          px-2 border bg-gray-100 text-sm"
        >
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-transparent">
            <div className="w-10 h-10 border-4 border-blue-900 border-t-white rounded-full animate-spin"></div>
          </div>
        )}
        {list?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm"
          >
            <img src={item?.images[0]} alt={item.name} className="w-20" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}{" "}
              {item.price}
            </p>
            <p
              className="text-right md:text-center cursor-pointer text-lg"
              onClick={() => removeProduct(item._id)}
            >
              X
            </p>
          </div>
        ))}
        {!list && <div className="flex items-center justify-center text-gray-800">
          no data here
        </div>}
      </div>
    </>
  );
};

export default List;
