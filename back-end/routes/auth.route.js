import express from "express";
import {login, signup, logout, verificationEmail, forgotPassword ,resetPassword} from "../controllers/auth.controller.js";
import {validatorMiddleware} from "../middlewares/validator.middleware.js";
import {forgetPasswordSchema, loginSchema, signupSchema, verificationCodeSchema} from "../schemas/userSchema.js";
// Auth Routes
const authRoutes=express.Router();
authRoutes.route('/login').post(validatorMiddleware(loginSchema),login)
authRoutes.route('/signup').post(validatorMiddleware(signupSchema),signup)
authRoutes.route('/logout').post(logout);
// Verification Route
authRoutes.route('/verification').post(validatorMiddleware(verificationCodeSchema),verificationEmail);
// Forgot Password Route
authRoutes.route('/forgotPassword').post(validatorMiddleware(forgetPasswordSchema),forgotPassword)
// Reset Password Route
authRoutes.route('/resetPassword/:token').post(resetPassword)
export default authRoutes;
