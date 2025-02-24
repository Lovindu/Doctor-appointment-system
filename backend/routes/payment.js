import express from "express";
import { createPayment, makePayment } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/createpayment", createPayment);

router.post("/create-checkout-session", makePayment);

export default router;