import Joi from "joi";

// auth schema for login and signup validation
export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
    }),
});

// Joi User Signup Scheme
export const signupSchema = Joi.object({
    name: Joi.string().min(2).required().messages({
        "string.empty": "First Name is required",
        "string.min": "First Name must be at least 2 characters long",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",})

});
export const verificationCodeSchema=Joi.object({
    verificationToken:Joi.string().required().messages({
        "string.empty":"Validation Code Required"
    })
})
export const forgetPasswordSchema=Joi.object({
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
})
