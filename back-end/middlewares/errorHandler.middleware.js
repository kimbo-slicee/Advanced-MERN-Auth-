import { CustomErrors } from "../errors/index.js";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
const errorHandlerMiddleware =(err, req, res,next) => {
    if (err instanceof CustomErrors) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            name:err.name
        });
    }
    // For unexpected errors
    const genericError = {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    };

    // Mongoose Error
    // Handle Validation Errors
    if (err.name === "ValidationError") {
        genericError.statusCode = 400;
        genericError.message = Object.values(err.errors)
            .map((error) => error.message)
            .join(", ");
    }

    // Handle Duplicate Key Errors
    if (err.code === 11000) {
        genericError.statusCode = 400;
        const field = Object.keys(err.keyValue)[0];
        genericError.message = `${field} already exists`;
    }

    // Handle Cast Errors
    if (err.name === "CastError") {
        genericError.statusCode = 400;
        genericError.message = `Invalid value for ${err.path}: ${err.value}`;
    }

    // Handle MongoDB Connection Errors
    if (err instanceof mongoose.Error.ConnectionError) {
        genericError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        genericError.message = "Database connection error";
    }


    // Return custom error response
    return res.status(genericError.statusCode).json({
        success: false,
        message: genericError.message,
        name:err.name,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorHandlerMiddleware;
