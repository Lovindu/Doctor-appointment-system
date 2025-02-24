import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema({
  doctorId: {
    type: String,
    required: true,
  },
  maximumAppointmentCount: {
    type: Number,
    required: true,
  },
  numberOfAppointments: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  fee: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("Session", SessionSchema);
