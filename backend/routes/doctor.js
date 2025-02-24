import express from "express";
import {
  createDoctor,
  getTopDoctors,
  getAllDoctors,
  getSpecificDoctor,
  getDoctorBySpeciality,
  getDoctorCount,
} from "../controllers/doctorController.js";
import upload from "../config/multer.js";

const router = express.Router();

router.post("/createdoctor", upload.single("image"), createDoctor);

// this is for the home page top doctors
router.get("/gettopdoctors", getTopDoctors);

router.get("/alldoctors", getAllDoctors);

router.get("/specificdoctor/:id", getSpecificDoctor);

router.get("/getdoctorbyspeciality/:speciality", getDoctorBySpeciality); //should change to req.body instead of using params (optional)

router.get("/getdoctorcount", getDoctorCount);

export default router;
