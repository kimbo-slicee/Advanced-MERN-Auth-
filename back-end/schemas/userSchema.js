import Joi from "joi";

// Joi User login Schema
export const loginSchema = Joi.object({
    name:Joi.string().required().messages({
        "string.empty": "Name is required",
    }),
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
    phone: Joi.number().integer().min(18).required().messages({
        "number.base": "phone number must be a number",
        "number.min": "phone number must be at least 18",
        "any.required": "phone number is required",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
    }),
    address: Joi.object().required().messages({
        "string.empty": "address is required",
    }),
});
export const verificationCodeSchema=Joi.object({
    verificationToken:Joi.string().required().messages({
        "string.empty":"Validation Code Required"
    })
})
