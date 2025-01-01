import express from "express";
import {
    login,
    signup,
    logout,
    verificationEmail,
    forgotPassword,
    resetPassword,
} from "../controllers/auth.controller.js";
import {validatorMiddleware} from "../middlewares/validator.middleware.js";
import {forgetPasswordSchema, loginSchema, signupSchema, verificationCodeSchema} from "../schemas/userSchema.js";
const authRoutes=express.Router();
// Authentication Routes
authRoutes.route('/login').post(validatorMiddleware(loginSchema),login)
authRoutes.route('/signup').post(validatorMiddleware(signupSchema),signup)
// Logout Route
authRoutes.route('/logout').post(logout);
// Verification Routes
authRoutes.route('/verification').post(validatorMiddleware(verificationCodeSchema),verificationEmail);
// Forgot Password Route
authRoutes.route('/forgot-password').post(validatorMiddleware(forgetPasswordSchema),forgotPassword)
// Reset Password Route
authRoutes.route('/forgot-password/:token').post(resetPassword)
export default authRoutes;
