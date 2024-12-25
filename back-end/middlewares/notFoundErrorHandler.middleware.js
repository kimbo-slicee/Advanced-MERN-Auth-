import {NotFoundError} from "../errors/index.js";

const notFoundErrorHandlerMiddleware=async (req,res,next)=>{
    next(new NotFoundError("Route not found"));
}
export default notFoundErrorHandlerMiddleware