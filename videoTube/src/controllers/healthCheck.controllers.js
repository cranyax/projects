// Import the standardized API response format
import { ApiResponse } from "../utils/ApiResponse.js";
// Import async handler to manage errors in asynchronous functions
import { asyncHandler } from "../utils/asyncHandler.js";

/**
 * @desc   Health check controller to verify if the server is running
 * @route  GET /api/health
 * @access Public
 */
const healthCheck = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "OK", "Health Check Passed")); // Sends a success response
});

export { healthCheck };
