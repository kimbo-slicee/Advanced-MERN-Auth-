import UserModel from "../models/User.model.js";
import {BadRequestError, CustomErrors,UnauthorizedError} from "../errors/index.js";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {sendVerificationEmail, welcomeEmail } from "../config/mailTrap/emails.js";
const signup=async (req,res)=>{
const{email}=req.body;
const user=await UserModel.findOne({email})
if(user)throw new BadRequestError("This Email ALl Ready Existe");
const registerUser=await UserModel.create({...req.body})
 // Generate Token For the new User
const token =registerUser.createToken(res);
await sendVerificationEmail(email,registerUser.getVerificationToken())
res.status(StatusCodes.CREATED).json({success:true,token,message:"User Has Ben Registered Successfully"})
}
// Email Verification
const verificationEmail=async (req, res)=>{

const user =await UserModel.findOne(
    {...req.body, verificationTokenExpiresAt: { $gt: Date.now() }}).select("-password");
        if (!user) throw new BadRequestError("User Not Found");
        await user.updateOne({isVerified:true});
        const {name,email}=user
        await welcomeEmail(name, email);
        res.status(StatusCodes.OK).json({success:true,data:user,message:"Email Verified Successfully"})

}
// Login Controller
const login=async (req,res)=>{
    /* This User Inputs are Validated by using Validator middleware by implementing JOI functionality but You are
     Free if u want to Use Express
     Validator or your own Validation */
    const{name,email,password}=req.body;
    //[1]:First Check if the User Existe
    const user=await UserModel.findOne({email})
    if(!user) throw new CustomErrors("User Not Found",StatusCodes.NOT_FOUND);
    //[2]:Check if the password provided by the use is the same as Hashed in user Document
    const comparePassword= user.comparePassword(password)
    if(!comparePassword) throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED))
    //[3]:if All Checks Are Passing Good Then We will Genet New JWT Token
    const token=user.createToken(res);
    res.status(StatusCodes.OK).json({success:true,token:token,message:"User Login Successfully"})
}
// Logout Controller
const logout=async (req,res)=>{
res.clearCookie("token");
res.status(StatusCodes.OK).json({success:true,message:"Logged Out successfully"})
}
export {
    login,
    signup,
    logout,
    verificationEmail
}