import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import productModel from "../models/productModel.js";

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "products",
        },
        (error, result) => {
          if (error) {
            return reject(error);
          }

          resolve(result);
        }
      );

    streamifier
      .createReadStream(fileBuffer)
      .pipe(uploadStream);
  });
};

const addProduct = async (req, res) => {
  try {
    const {
      name,
      descripition,
      price,
      category,
      bestseller,
    } = req.body;

    const image1 = req.files?.image1?.[0];
    const image2 = req.files?.image2?.[0];
    const image3 = req.files?.image3?.[0];
    const image4 = req.files?.image4?.[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );
    
const imagesUrl = await Promise.all(
  images.map(async (item) => {
    const result = await uploadToCloudinary(
      item.buffer
    );

    return result.secure_url;
  })
);

    const productData = {
      name,
      descripition,
      category,
      price: Number(price),
      images: imagesUrl,
      bestseller: bestseller === "true" ? true : false,
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    res
      .status(201)
      .json({ success: true, message: "Product Added Successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ _id: -1 });;
    res.status(201).json({ success: true, message: products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res
      .status(201)
      .json({ success: true, message: "Product Remove Successfully..." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.status(201).json({ success: true, product: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
export { addProduct, listProducts, removeProduct, singleProduct };
