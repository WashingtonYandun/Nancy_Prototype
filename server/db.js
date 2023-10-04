import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

if (!MONGODB_URI) {
    throw new Error("MONGODB_URI must be defined");
}

const connectDb = async () => {
    try {
        const { connection } = await mongoose.connect(MONGODB_URI);

        if (connection.readyState === 1) {
            console.log(`MongoDB Connected. State => ${connection.readyState}`);
            return Promise.resolve(true);
        }
    } catch (error) {
        console.log("Error connecting to MongoDB");
        console.error(error);
        return Promise.reject(error);
    }
};

export { connectDb };
