import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


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
    zipCode:{
      type:Number,
      default:1e00
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    restPasswordToken:String,
    restPasswordExpiresAt:Date,
    verificationToken:String,
    verificationTokenExpiresAt:Date,



},{timestamps:true});
// Create Function that's can Crypt The Password Before Saving User
UserSchema.pre("save",async function (next){
    const salt=await bcrypt.genSalt(10)
    this.password=await bcrypt.hash(this.password,salt);
    next()
})
UserSchema.pre("save",function (next){
    this.verificationToken=Math.ceil(10000 + Math.random() *90000).toString();
    this.verificationTokenExpiresAt = Date.now() + (7 * 86400 * 1000);
    next()
})
// Create Function that can Compare User Password With the Password Given
UserSchema.methods.comparePassword= function (password){
  return  bcrypt.compare(this.password,password)
}
// Create Jwt
UserSchema.methods.createToken=function (res){
    const token =jwt.sign({id: this._id, name:this.name}, process.env.JWT_SECRETE, {algorithm: 'HS256', expiresIn: '1h',});
    res.cookie("token",token,{
        httpOnly:true,secure:process.env.NODE_ENV==="production",
        sameSite:"strict",
        maxAge:7*86400
    })
    return token;
}
UserSchema.methods.getVerificationToken=function (){
    return this.verificationToken;
}
 const UserModel= mongoose.model("Users",UserSchema)
export default UserModel