import Doctor from "../models/Doctor.js";
import { v2 as cloudinary } from "cloudinary";
import upload from "../config/multer.js";
import { response } from "express";
import User from "../models/User.js";

//create doctor
export const createDoctor = async (req, res, next) => {
  //const newDoctor = new Doctor(req.body);

  try {
    const imageFile = req.file;

    //uploading image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageUrl = imageUpload.secure_url;
    const newDoctor = new Doctor({ ...req.body, image: imageUrl });

    const createdDoctor = await newDoctor.save();
    res.status(200).json(createdDoctor);
  } catch (err) {
    next(err);
  }
};

// this is for the home page top doctors
export const getTopDoctors = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ experience: { $gt: 5 } }).limit(5);
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

// get all doctors
export const getAllDoctors = async (req, res, next) => {
  try {
    const allDoctors = await Doctor.find();
    res.status(200).json(allDoctors);
  } catch (err) {
    next(err);
  }
};

// get specific doctor
export const getSpecificDoctor = async (req, res, next) => {
  try {
    const theDoc = await Doctor.findById(req.params.id);
    res.status(200).json(theDoc);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "Doctor not found",
    });
  }
};

// getdoctorbyspeciality
export const getDoctorBySpeciality = async (req, res, next) => {
  try {
    const doctors = await Doctor.find({ speciality: req.params.speciality });
    res.status(200).json(doctors);
  } catch (err) {
    next(err);
  }
};

//get doctor count
export const getDoctorCount = async (req, res, next) => {
  try {
    const doctorCount = await Doctor.countDocuments();
    res.status(200).json({ doctorCount: doctorCount });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};
