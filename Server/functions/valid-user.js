import Joi from "joi";

export function validateRegistereUser(obj) {
    return Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(5).max(200).required(),
        password: Joi.string().trim().min(6).required(),
        isAdmin: Joi.bool(),
    }).validate(obj);
}
export function validateLoginUser(obj) {
    return Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    }).validate(obj);
}
export function validateUpdatUser(obj) {
    return Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        username: Joi.string().trim().min(5).max(200),
        password: Joi.string().trim().min(6),
        isAdmin: Joi.bool(),
    }).validate(obj);
}
// module.exports = {validateCreateUser,validateUpdatUser};