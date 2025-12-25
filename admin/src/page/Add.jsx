import React, { useState } from "react";
import Login from "../component/Login";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendURL } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [descripition, setDescripition] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("Cactus");
  const [bestseller, setBestSeller] = useState(false);
  const onSumbitHandler = async (e) => {
    e.preventDefault();
    try {
      const formatData = new FormData();
      formatData.append("name", name);
      formatData.append("descripition", descripition);
      formatData.append("category", category);
      formatData.append("price", price);
      formatData.append("bestseller", bestseller);

      image1 && formatData.append("image1", image1);
      image2 && formatData.append("image2", image2);
      image3 && formatData.append("image3", image3);
      image4 && formatData.append("image4", image4);

      const responsed = await axios.post(
        backendURL + "/api/product/add",
        formatData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responsed.data.success) {
        toast.success(responsed.data.message);
        setName("");
        setDescripition("");
        setPrice("");
        setCategory("Cactus");
        setBestSeller(false);
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <form
      className="flex flex-col items-start w-full gap-3"
      onSubmit={onSumbitHandler}
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image1"
              hidden
              onChange={(e) => setImage1(e.target.files[0])}
            />
          </label>
          <label htmlFor="image2">
            <img
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image2"
              hidden
              onChange={(e) => setImage2(e.target.files[0])}
            />
          </label>
          <label htmlFor="image3">
            <img
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image3"
              hidden
              onChange={(e) => setImage3(e.target.files[0])}
            />
          </label>
          <label htmlFor="image4">
            <img
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt="upload area"
              className="w-20"
            />
            <input
              type="file"
              id="image4"
              hidden
              onChange={(e) => setImage4(e.target.files[0])}
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          placeholder="Product Name Type here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Descripition</p>
        <textarea
          type="text"
          placeholder="Write Content Here"
          required
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => setDescripition(e.target.value)}
          value={descripition}
        />
      </div>
      <div className="flex flex-col sm:flex-row  w-full gap-2  sm:gap-8">
        <div className="">
          <p className="mb-2">Product Category</p>
          <select
            id=""
            className="w-full px-3 sm:py-[9px] py-2"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Cactus">Cactus</option>
            <option value="Fruit">Fruit Plants</option>
            <option value="Herbs">Herbs</option>
            <option value="Imported">Imported Plants</option>
            <option value="Tree">Tree Plant</option>
            <option value="Creeper">Creeper</option>
            <option value="Hanging">Hanging Plants</option>
            <option value="Indoor">Indoor Plants</option>
          </select>
        </div>
        <div className="">
          <p className="mb-2">Product Price</p>
          <input
            type="number"
            placeholder="Price Here"
            className="w-full px-3 py-2 sm:w-[120px]"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
      </div>
      <div className="flex gap-2 items-center mt-2">
        <input
          type="checkbox"
          id="bestseller"
          className="cursor-pointer"
          checked={bestseller}
          onChange={() => setBestSeller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Add to bestseller
        </label>
      </div>
      <button
        type="sumbit"
        className="w-28 py-3 mt-4 bg-green-700 text-white active:bg-green-900 rounded-md uppercase"
      >
        Add
      </button>
    </form>
  );
};

export default Add;
