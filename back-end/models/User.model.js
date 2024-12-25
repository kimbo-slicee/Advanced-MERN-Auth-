import mongoose from "mongoose";
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Provide User Name"]
    },
    email:{
        type:String,
        required:[true,"Please Provide User Email"],
        minLength:4,
        maxLength:50,
        unique:true,
        match:/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    phone:{
        type:String,
        required:[true,"Please Provide User Phone "],
        minLength:5,
        maxLength:20,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please Provide A Valid User Password"],
        minLength:5,
        maxLength:20,
    },
    address:{
        type:Object,
        default:{
            line1: "",
            line2: ""
        }
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    },
    restPasswordToken:String,
    restPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date


},{timestamps:true})