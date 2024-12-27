import {NotFoundError} from "../errors/index.js";

const notFoundErrorHandlerMiddleware=(err,req,res,next)=>{
    console.log(err)
    next(new NotFoundError("Route not found"));
}
export default notFoundErrorHandlerMiddleware