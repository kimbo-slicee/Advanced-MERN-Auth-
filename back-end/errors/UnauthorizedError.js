import CustomErrors from "./CustomErrors.js";
import {getReasonPhrase, StatusCodes} from "http-status-codes";

class UnauthorizedError extends CustomErrors{
    constructor(message) {
        super(message);
        this.statusCode=StatusCodes.UNAUTHORIZED
        this.name=getReasonPhrase(StatusCodes.UNAUTHORIZED)
    }
}
export default UnauthorizedError;