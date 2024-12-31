import CustomErrors from "./CustomErrors.js";
import {StatusCodes} from "http-status-codes";

class UnauthorizedError extends CustomErrors{
    constructor(message) {
        super(message);
        this.statusCode=StatusCodes.UNAUTHORIZED
    }
}
export default UnauthorizedError;