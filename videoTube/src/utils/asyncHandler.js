/**
 * @desc   Middleware to handle async errors without try-catch blocks
 * @param  {Function} reqHandler - The async route handler function
 * @returns {Function} Wrapped function with error handling
 */
const asyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err)); // Automatically passes errors to Express
    };
};

export { asyncHandler };
