import express from "express";
import {login, signup,logout} from "../controllers/auth.controller.js";
// Auth Routes
const authRoutes=express.Router();
authRoutes.route('/login').post(login)
authRoutes.route('/signup').post(signup)
authRoutes.route('/logout').post(logout)
export default authRoutes;
