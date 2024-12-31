import { getReasonPhrase, StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    // Default to internal server error
    let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    let message = err.message || getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

    // Handle specific error types
    if (err.name === "ValidationError") {
        // Handle MongoDB validation errors
        statusCode = StatusCodes.BAD_REQUEST;
        message = "Invalid data input: " + Object.values(err.errors).map((e) => e.message).join(", ");
    } else if (err.name === "MongoServerError" && err.code === 11000) {
        // Handle MongoDB duplicate key errors
        statusCode = StatusCodes.CONFLICT;
        message = "Duplicate value error: " + JSON.stringify(err.keyValue);
    } else if (err.name === "JsonWebTokenError") {
        // Handle invalid JWT tokens
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Invalid token";
    } else if (err.name === "TokenExpiredError") {
        // Handle expired JWT tokens
        statusCode = StatusCodes.UNAUTHORIZED;
        message = "Token expired";
    } else if (err.name === "UnauthorizedError") {
        // Handle custom unauthorized errors
        statusCode = StatusCodes.UNAUTHORIZED;
    }

    // Log the error for debugging (use a logging library like Winston in production)
    console.error(err);

    // Send the error response
    res.status(statusCode).json({ message });
};

export default errorHandlerMiddleware;
