import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/index.js";
export const authMiddleware = (req, res, next) => {
    try {
        // Ensure cookies are available
        const token = req.cookies?.token;
        // If no token is found, throw an error
        if (!token) {
            throw new UnauthorizedError("Unauthorized: No token provided");
        }
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach user ID to the request object
        req.userId = decoded.id;
        // Proceed to the next middleware
        next();
    } catch (err) {
        // Handle JWT-specific errors
        if (err.name === "JsonWebTokenError") {
            err = new UnauthorizedError("Unauthorized: Invalid token");
        } else if (err.name === "TokenExpiredError") {
            err = new UnauthorizedError("Unauthorized: Token expired");
        }
        // Pass the error to the error-handling middleware
        next(err);
    }
};
