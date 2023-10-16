import Joi from "joi";

export function validateCreateAuthors(obj) {
    return Joi.object({
        firstName: Joi.string().trim().min(3).max(200).required(),
        lastName: Joi.string().trim().min(3).max(200).required(),
        nationality: Joi.string().trim().min(3).max(500).required(),
        image: Joi.string().trim(),
    }).validate(obj);
}
export function validateUpdatAuthors(obj) {
    return Joi.object({
        firstName: Joi.string().trim().min(3).max(200),
        lastName: Joi.string().trim().min(3).max(200),
        nationality: Joi.string().trim().min(3).max(500),
        image: Joi.string().trim(),
    }).validate(obj);
}
// module.exports = {validateCreateUser,validateUpdatUser};