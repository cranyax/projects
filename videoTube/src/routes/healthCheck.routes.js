// Import Express Router
import { Router } from "express";
// Import the health check controller function
import { healthCheck } from "../controllers/healthCheck.controllers.js";

// Initialize Express Router
const router = Router();

/**
 * @route  GET /api/health
 * @desc   Route to check server health
 * @access Public
 */
router.route("/").get(healthCheck);

export default router;
