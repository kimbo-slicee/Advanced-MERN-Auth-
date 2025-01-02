import express from "express"
import {authMiddleware} from "../middlewares/auth.middleware.js";
import {userProfile} from "../controllers/user.controller.js";
const userRoute=express.Router();
userRoute.route('/profile').get(authMiddleware,userProfile)
export default userRoute