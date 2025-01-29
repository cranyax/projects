import { app } from "./app.js";  // Import the Express app instance
import dotenv from "dotenv";      // Load environment variables
import connectDB from "./db/index.js"; // Import DB connection function

// Load environment variables from .env file
dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 8000; // Default port to 8000 if not specified

// Connect to MongoDB, then start the server
connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) => {
   console.log("MongoDB connection error", err); 
});
