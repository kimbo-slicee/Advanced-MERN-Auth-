import {UnauthorizedError} from "../errors/index.js";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
import jwt from "jsonwebtoken";

const authMiddleware=(err,req,res,next)=>{
const token=req.cookies.token;
if(!token) throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED));
const decoded=jwt.decode(token,process.env.JWT_SECRETE);
if(!decoded) throw new UnauthorizedError(getReasonPhrase(StatusCodes.UNAUTHORIZED));
console.log(decoded)
res.userId=decoded.id
next()
}
export default authMiddleware