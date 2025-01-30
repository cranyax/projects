import express from "express";  // Import Express framework
import cors from "cors";        // Import CORS middleware

const app = express();  // Initialize Express app

// Enable CORS (Cross-Origin Resource Sharing)
app.use(
    cors({
        origin: process.env.CORS_ORIGIN, // Allow only specified origin
        credentials: true // Allow cookies and credentials in CORS requests
    })
);

// Common middlewares
app.use(express.json({ limit: "16kb" }));  // Parse JSON requests (limit 16kb)
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Parse URL-encoded data
app.use(express.static("public"));  // Serve static files from "public" directory

// import routes
import { healthCheck } from "./controllers/healthCheck.controllers.js";


// routes

app.use("/api/v1/healthcheck", healthCheck);

export { app };  // Export app instance
