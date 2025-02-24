import express from "express";
import { createAppointment, userAppointments, getAllAppointments, appointmentCount, deleteAppointment } from "../controllers/appointmentController.js";

const router = express.Router();

router.post("/newappointment", createAppointment);

router.get("/userappointments/:id", userAppointments);

router.get("/allappointments", getAllAppointments);

router.get("/appointmentcount", appointmentCount);

router.delete("/deleteappointment/:id", deleteAppointment);

export default router;