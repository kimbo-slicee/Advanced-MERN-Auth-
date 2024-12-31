import "dotenv/config.js";
import 'express-async-errors';
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.routes.js";
import notFoundErrorHandlerMiddleware from "./middlewares/notFoundErrorHandler.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";

const port = process.env.PORT || 5000;
const app = express();

// Validate required environment variables
if (!process.env.CLIENT_URL || !process.env.JWT_SECRET) {
    console.error("Missing required environment variables");
    process.exit(1);
}

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL, // Support multiple origins if needed
    credentials: true,
}));
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies

// Routes
app.use('/api/v1/auth', authRoutes); // Authentication routes
app.use('/api/v1/user', userRoutes); // User-related routes

// Error handling middlewares
app.use(notFoundErrorHandlerMiddleware); // Handle 404 errors
app.use(errorHandlerMiddleware); // Handle API and database errors

// Start the server
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
            console.log(`Connected to MongoDB`);
        });
    })
    .catch((err) => {
        console.error("Database connection failed:", err);
        process.exit(1); // Exit the process if DB fails to connect
    });

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("Shutting down gracefully...");
    process.exit(0);
});
