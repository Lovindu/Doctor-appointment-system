import express from "express";
import {
  adminLogin,
  login,
  signup,
  updatePassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/createuser", signup);

router.post("/login", login);

router.put("/updatepassword/:id", updatePassword);

router.post("/adminlogin", adminLogin);

export default router;
