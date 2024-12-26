import {NotFoundError} from "../errors/index.js";

const notFoundErrorHandlerMiddleware=(err,req,res,next)=>{
    next(new NotFoundError("Route not found"));
}
export default notFoundErrorHandlerMiddleware