import UserModel from "../models/User.model.js";
import {CustomErrors} from "../errors/index.js";
import {StatusCodes} from "http-status-codes";

// Get User Profile
const userProfile=async (req,res)=>{
    const user=await UserModel.findById(req.userId).select("-password");
    if(!user)throw new CustomErrors("User Not Found",StatusCodes.BAD_REQUEST);
    res.status(StatusCodes.OK).json({success:true,data:user})
}
export {
    userProfile
}