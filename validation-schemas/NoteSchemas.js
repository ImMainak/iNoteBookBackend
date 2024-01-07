const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate); // extend Joi with Joi Date

// Create Note Schema
module.exports.noteCreateSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    tag: Joi.string().required()
});

// Update Note Schema
module.exports.noteUpdateSchema = Joi.object().keys({
    title: Joi.string().allow('', null),
    description: Joi.string().allow('', null),
    tag: Joi.string().allow('', null)
});