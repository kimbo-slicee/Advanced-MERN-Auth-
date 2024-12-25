import "dotenv/config.js";
import 'express-async-errors';
import cors from "cors";
import express from "express";
import connectDB from "./config/mongoDB.js";
import authRoutes from "./routes/auth.route.js";
import notFoundErrorHandlerMiddleware from "./middlewares/notFoundErrorHandler.middleware.js";
import errorHandlerMiddleware from "./middlewares/errorHandler.middleware.js";
const port =process.env.PORT || 5000;
const app=express();
app.use(cors());
app.use(express.json());
// Authentication Routs
app.use('/api/v1/auth',authRoutes);
//Handling Errors
app.use(notFoundErrorHandlerMiddleware)// handel 404 Errors
app.use(errorHandlerMiddleware)// Handel API and DB Errors
// Start server
app.listen(port,()=>{
    //Connection To MongoDB
    connectDB().then(_=>console.log("DB Connected")).catch(err=>console.log(err))// you can handel DB errors Here
    console.log(`Application work in port ${port}`)
})