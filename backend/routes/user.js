import express from "express";
import {
  getAllUsers,
  getUser,
  updateUser,
  userCount,
} from "../controllers/userController.js";

const router = express.Router();

router.put("/updateuser/:id", updateUser);

router.get("/getallusers", getAllUsers);

router.get("/usercount", userCount);

router.get("/getuser/:id", getUser);

export default router;
