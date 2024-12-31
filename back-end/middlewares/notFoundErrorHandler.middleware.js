import {StatusCodes} from "http-status-codes";
const notFoundErrorHandlerMiddleware = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        message: "Route not found",
    });
};

export default notFoundErrorHandlerMiddleware;
