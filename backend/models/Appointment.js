import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    appointmentNumber: {
        type: String,
        required: true
    },
})

export default mongoose.model("Appointment", AppointmentSchema);