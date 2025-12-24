import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRouter.js";
import orderRouter from "./routes/orderRouter.js";
import contactRouter from "./routes/ContactRoutes.js";
import HeroRouter from './routes/HeroSectionRouter.js';
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const __dirname = path.resolve();
app.use(express.json());
app.use(cors());

connectDB();
connectCloudinary();



// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/contact", contactRouter);
app.use("/api/hero",HeroRouter)

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => console.log("Server started on PORT: " + port));
