/**
 * @desc   Custom error class to standardize error handling
 */
class ApiError extends Error {
    /**
     * @param {number} statusCode - HTTP status code (e.g., 400, 404, 500)
     * @param {string} message - Error message (default: "Something went wrong")
     * @param {Array} errors - Additional error details (default: [])
     * @param {string} stack - Stack trace (optional)
     */
    constructor(statusCode, message = "Something went wrong", errors = [], stack = "") {
        super(message);  // Call the parent class (Error) constructor

        this.statusCode = statusCode;  // HTTP status code
        this.data = null;  // No data in error responses
        this.message = message;  // Error message
        this.success = false;  // Always false for errors
        this.errors = errors;  // Additional error details (if any)

        // Capture stack trace for debugging, unless provided
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
