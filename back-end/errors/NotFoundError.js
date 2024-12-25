import {CustomErrors} from "./index.js";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
class NotFoundError extends CustomErrors{
 constructor(message) {
     super(message);
     this.statusCode=StatusCodes.NOT_FOUND;
     this.name = getReasonPhrase(StatusCodes.NOT_FOUND);

 }
}
export default NotFoundError;