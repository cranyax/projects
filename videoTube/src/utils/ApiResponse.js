/**
 * @desc   Class to format API responses in a consistent way
 */
class ApiResponse {
    /**
     * @param {number} statusCode - HTTP status code (e.g., 200, 400, 500)
     * @param {any} data - The response payload (e.g., object, array, string)
     * @param {string} message - A custom message (default: "Success")
     */
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;  // HTTP status code
        this.data = data;              // API response data
        this.message = message;        // Custom message
        this.success = statusCode < 400; // Boolean indicating success (true for <400 status codes)
    }
}

export { ApiResponse };
