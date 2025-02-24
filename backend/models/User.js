import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        default: ""
    },
    contactNumber: {
        type: String,
        default: null
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    nic: {
        type: String,
    },
    address: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type:Boolean,
        default: false
    },
    image: {
        type: String,
        default: ""
    }
})

export default mongoose.model("User", UserSchema);