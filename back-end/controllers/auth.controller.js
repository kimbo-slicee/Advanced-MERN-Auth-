import UserModel from "../models/User.model.js";
import {BadRequestError, CustomErrors, UnauthorizedError} from "../errors/index.js";
import {StatusCodes} from "http-status-codes";
import {
    sendPasswordRestEmail,
    sendPasswordRestSuccessEmail,
    sendVerificationEmail,
    welcomeEmail
} from "../config/mailTrap/emails.js";
import * as crypto from "crypto";
import bcrypt from "bcryptjs";


const signup=async (req,res)=>{
const{email}=req.body;
const user=await UserModel.findOne({email})
if(user)throw new BadRequestError("User Already Existe");
const registerUser=await UserModel.create({...req.body})
 // Generate Token For the new User
const token =registerUser.createToken(res);
await sendVerificationEmail(email,registerUser.getVerificationToken())
res.status(StatusCodes.CREATED).json({success:true,message:"User Has Ben Registered Successfully",token:token})
}
// Email Verification
const verificationEmail=async (req, res)=>{

const user =await UserModel.findOne(
    {...req.body, verificationTokenExpiresAt: { $gt: Date.now() }}).select("-password");
        if (!user) throw new BadRequestError("User Not Found");
        const {email, name} = user;
        // send Mail after verification
        await welcomeEmail(email, name);
        // Update User Document after Verification
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        // Send Response
        res.status(StatusCodes.OK).json({
            success:true,
            data:{
                ...user._doc,
                password: undefined,
            },
            message:"Email Verified Successfully"})

}
// Login Controller
const login=async (req,res)=>{
    /* This User Inputs are Validated by using Validator middleware by implementing JOI functionality but You are
     Free if u want to Use Express
     Validator or your own Validation */
    const{email,password}=req.body;
    console.log(email,password);
    //[1]:First Check if the User Existe
    const user=await UserModel.findOne({email})
    if(!user) throw new CustomErrors("invalid Cridentiles",StatusCodes.NOT_FOUND);
    //[2]:Check if the password provided by the use is the same as Hashed in user Document
    const comparePassword= user.comparePassword(password)
    if(!comparePassword) throw new UnauthorizedError("Invalid Cridentiles")
    //[3]:if All Checks Are Passing Good Then We will Genet New JWT Token
    const token= user.createToken(res);
    user.password=undefined;
    res.status(StatusCodes.OK).json({success:true,data:user,message:"User Logged In Successfully",token:token})
}
// Logout Controller
const logout=async (req,res)=>{
res.clearCookie("token");
res.status(StatusCodes.OK).json({success:true,message:"Logged Out successfully"})
}
// Forgot Password Controller
const forgotPassword=async (req,res)=>{
    const user=await UserModel.findOne({...req.body});
    if(!user) throw new CustomErrors("User Not Found",StatusCodes.NOT_FOUND);
    // If The User Existe We Will send New Verification Code
    const restToken=crypto.randomBytes(20).toString("hex")
    //Important Note The Crypto It's now a built-in Node
    // module. If you've depended on crypto, you should switch to the one that's built-in.
    const restTokenExpirationDate=Date.now() +(60 * 60 * 1000)// 1 Hour
    user.restPasswordToken=restToken;
    user.restPasswordExpiresAt=restTokenExpirationDate;
    await user.save();
    //Send Email To Reset Password
    await sendPasswordRestEmail(user.email,`${process.env.CLIENT_URL}/forgot-password/${restToken}`);
    res.status(StatusCodes.OK).json({success:true,message:"Password reset link sent to Your Email"})

}
// Reset Password Controller
const  resetPassword=async (req,res)=>{
const {params:{token}, body:{password}}=req
    if(!token || !password) throw new BadRequestError("Invalid Token or Password");
    const user=await UserModel.findOne({restPasswordToken:token,restPasswordExpiresAt: {$gt:Date.now()}});
    if (!user) throw new CustomErrors("Invalid Token",StatusCodes.NOT_FOUND);
    const salt=await bcrypt.genSalt(10)
    user.password=await bcrypt.hash(password, salt);
    user.restPasswordToken=undefined;
    user.restPasswordExpiresAt=undefined;
    await user.save();
    const {email}=user
    await sendPasswordRestSuccessEmail(email);
    res.status(StatusCodes.OK).json({success:true, message: "Password Updated Successfully"})

}
export {
    login,
    signup,
    logout,
    verificationEmail,
    forgotPassword,
    resetPassword,
}