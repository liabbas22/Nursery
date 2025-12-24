import express from "express";
import {
  userLogin,
  userRegister,
  adminLogin, UserData,
} from "../controllers/usercontroller.js";
const userRouter = express.Router();
userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);
userRouter.post("/admin", adminLogin);
userRouter.get("/", UserData)
export default userRouter;
