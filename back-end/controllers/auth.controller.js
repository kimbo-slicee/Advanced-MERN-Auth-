import UserModel from "../models/User.model.js";
import {BadRequestError} from "../errors/index.js";
import {StatusCodes} from "http-status-codes";
const signup=async (req,res)=>{
const{email}=req.body;
const user=await UserModel.findOne({email})
if(user)throw new BadRequestError("This Email ALl Ready Existe");
const registerUser=await UserModel.create({...req.body})
console.log(registerUser);
 // Generate Token For the new User
const token =registerUser.createToken(res);
res.status(StatusCodes.CREATED).json({success:true,token,message:"User Has Ben Registered Successfully"})
}
const login=async (req,res)=>{
res.status(200).send("<h1>Hello World Login Page</h1>")
}

const logout=async (req,res)=>{
res.status(200).send("<h1>Hello World logout Page</h1>")

}
export {
    login,
    signup,
    logout
}