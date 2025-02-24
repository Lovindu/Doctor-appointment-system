import mongoose from "mongoose";

let isConnected = false; // Track connection state

const connectDB = async (uri) => {
    if (isConnected) {
        console.log("Using existing database connection");
        return;
    }

    try {
        await mongoose.connect(uri/* , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } */);
        isConnected = true;
        console.log("Database connected!");
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }

    mongoose.connection.on("disconnected", () => {
        console.log("Database disconnected!");
        isConnected = false;
    });
};

export default connectDB;


