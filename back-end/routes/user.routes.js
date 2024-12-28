import express from "express"
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {userProfile} from "../controllers/user.controller.js";
const userRoutes=express.Router();
userRoutes.route('/').get(authMiddleware,userProfile)
export default userRoutes