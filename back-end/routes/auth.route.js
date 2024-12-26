import express from "express";
import {login, signup, logout, verificationEmail} from "../controllers/auth.controller.js";
import {validatorMiddleware} from "../middlewares/validator.middleware.js";
import {loginSchema, signupSchema, verificationCodeSchema} from "../schemas/userSchema.js";
// Auth Routes
const authRoutes=express.Router();
authRoutes.route('/login').post(validatorMiddleware(loginSchema),login)
authRoutes.route('/signup').post(validatorMiddleware(signupSchema),signup)
authRoutes.route('/logout').post(logout);
// Verification Routes
authRoutes.route('/verification').post(validatorMiddleware(verificationCodeSchema),verificationEmail)
export default authRoutes;
