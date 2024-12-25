import {StatusCodes} from "http-status-codes";

export const validatorMiddleware =(schema) =>(req, res, next) => {
    // Validate the request body
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        // Return validation errors
        return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            errors: error.details.map((err) => err.message),
        });
    }

    next();
};
