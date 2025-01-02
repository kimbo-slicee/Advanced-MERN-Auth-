import "dotenv/config.js";
import 'express-async-errors';
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import notFoundErrorHandlerMiddleware from "./middlewares/notFoundErrorHandler.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
import swaggerUI from "swagger-ui-express";
import yaml from "yamljs";
const port = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

// Middleware setup
app.use(cors({
    origin: process.env.CLIENT_URL, // Support multiple origins if needed
    credentials: true,
}));
app.use(express.json()); // Parse incoming JSON data
app.use(cookieParser()); // Parse cookies

// Load the Swagger YAML file
const swaggerDocument = yaml.load("./swagger.yaml");

// Serve Swagger UI at the /api-docs route
app.use('/api/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Application routes
app.use('/api/v1/auth', authRoutes); // Authentication routes
app.use('/api/v1/user', userRoute); // User-related routes

// Validate required environment variables
if (!process.env.CLIENT_URL || !process.env.JWT_SECRET) {
    console.error("Missing required environment variables");
    process.exit(1);
}
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/front-end/dist")));
    app.get("*", (req, res) =>{
        res.sendFile(path.resolve(__dirname, "front-end", "dist", "index.html"));
    });

}
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
