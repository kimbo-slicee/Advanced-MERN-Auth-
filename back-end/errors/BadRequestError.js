import {getReasonPhrase, StatusCodes} from "http-status-codes";
import CustomErrors from "./CustomErrors.js";
class BadRequestError extends CustomErrors{
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.BAD_REQUEST; // HTTP status for Bad request
        this.name = getReasonPhrase(StatusCodes.BAD_REQUEST);
    }
}
export default BadRequestError