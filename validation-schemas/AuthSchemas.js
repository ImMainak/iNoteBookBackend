const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

// Create User Schema
module.exports.userRegisterSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        }),
}).with('password', 'confirm_password');

// Login Schema
module.exports.userLoginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
});

//Reset password
module.exports.resetPasswordSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string()
        .min(8)
        .required()
        .messages({
            'string.min': `"Password" should have a minimum length of 6 charecters`,
        }),
    confirm_password: Joi.string().valid(Joi.ref('password')).required()
        .messages({
            'any.only': `"Confirm Password" should match with "Password"`
        })
}).with('password', 'confirm_password');