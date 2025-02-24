import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotnev from "dotenv";
import connectDB from "../config/mongodb.js";
import paymentsRouter from "../routes/payment.js";
import doctorRouter from "../routes/doctor.js";
import sessionRouter from "../routes/session.js";
import userRouter from "../routes/user.js";
import appointmentRouter from "../routes/appointment.js";
import authRouter from "../routes/auth.js";
import connectCloudinary from "../config/cloudinary.js";

dotnev.config();

export function createServer() {
    const app = express();

    // Connect to MongoDB
    /* connectDB(); */

    // Connect Cloudinary
    connectCloudinary();

    // Middlewares
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRouter);
    app.use("/api/payments", paymentsRouter);
    app.use("/api/doctor", doctorRouter);
    app.use("/api/session", sessionRouter);
    app.use("/api/user", userRouter);
    app.use("/api/appointment", appointmentRouter);

    // Error Handling Middleware
    app.use((err, req, res, next) => {
        const errorStatus = err.status || 500;
        const errorMessage = err.message || "Something went wrong!";
        return res.status(500).json({
            success: false,
            status: errorStatus,
            message: errorMessage,
            stack: err.stack,
        });
    });

    return app;
}