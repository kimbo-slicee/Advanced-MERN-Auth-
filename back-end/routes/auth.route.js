import express from "express";
import {login, signup,logout} from "../controllers/auth.controller.js";
import {validatorMiddleware} from "../middlewares/validator.middleware.js";
import {loginSchema, signupSchema} from "../schemas/userSchema.js";
// Auth Routes
const authRoutes=express.Router();
authRoutes.route('/login').post(validatorMiddleware(loginSchema),login)
authRoutes.route('/signup').post(validatorMiddleware(signupSchema),signup)
authRoutes.route('/logout').post(logout)
export default authRoutes;
