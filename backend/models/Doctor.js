import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  education: {
    type: [String],
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  amountPerPatient: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  image: {
    type: String,
  },
});

export default mongoose.model("Doctor", DoctorSchema);
