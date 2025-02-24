import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true
    }, 
    patientId: {
        type: String,
        required: true
    },
    referenceNumber: {
        type: String,
        required: true
    },
    amount: {
        type:Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

export default mongoose.model("Payment", PaymentSchema);