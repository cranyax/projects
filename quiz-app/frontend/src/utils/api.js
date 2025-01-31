import axios from "axios";

// URL of backend server
const API_URL = "http://localhost:5000/api/quiz";

// Function to fetch quiz data from the backend
export const fetchQuizData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching quiz data:", error);
    return [];
  }
};
