import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors()); // Enable CORS

// API route to fetch quiz data
app.get("/api/quiz", async (req, res) => {
  try {
    const response = await axios.get("https://api.jsonserve.com/Uw5CrX");
    res.json(response.data); // Send the quiz data as a JSON response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching quiz data" });
  }
});

const PORT = 5000; // Put this .env in production
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
