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
    firstName: Joi.string().min(2).required().messages({
        "string.empty": "First Name is required",
        "string.min": "First Name must be at least 2 characters long",
    }),
    lastName: Joi.string().min(2).required().messages({
        "string.empty": "Last Name is required",
        "string.min": "Last Name must be at least 2 characters long",
    }),
    email: Joi.string().email().required().messages({
        "string.empty": "Email is required",
        "string.email": "Invalid email format",
    }),
    password: Joi.string().min(8).required().messages({
        "string.empty": "Password is required",
        "string.min": "Password must be at least 8 characters long",
    }),
    age: Joi.number().integer().min(18).required().messages({
        "number.base": "Age must be a number",
        "number.min": "Age must be at least 18",
        "any.required": "Age is required",
    }),
});
