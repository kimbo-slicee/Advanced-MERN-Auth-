import { CustomErrors } from "../errors/index.js";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
const errorHandlerMiddleware = async (err, req, res, next) => {
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

    return res.status(genericError.statusCode).json({
        success: false,
        message: genericError.message,
        // Include stack trace only in development
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};

export default errorHandlerMiddleware;
