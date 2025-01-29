import mongoose from "mongoose"; // Import mongoose
import { DB_NAME } from "../constants.js"; // Import DB name from constants.js

const connectDB = async () => {
    try {
        // Connect to MongoDB using MONGODB_URI from .env file
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        // Log successful connection
        console.log(`\n MongoDB connected! DB host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MongoDB Connection error", error);
        process.exit(1); // Exit process on failure
    }
};

export default connectDB;
