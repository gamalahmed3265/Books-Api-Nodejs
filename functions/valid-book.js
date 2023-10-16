import Joi from "joi";

export function validateCreateBook(obj){
    return Joi.object({
        title: Joi.string().trim().min(3).max(250).required(),
        author: Joi.string().required(),
        descriptions: Joi.string().trim().min(5).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().required().valid("soft cover", "hard cover"),
    }).validate(obj);
}
export function validateUpdateBook(obj){
    return Joi.object({
        title: Joi.string().trim().min(3).max(250),
        author: Joi.string(),
        descriptions: Joi.string().trim().min(5),
        price: Joi.number().min(0),
        cover: Joi.string().valid("soft cover", "hard cover"),
    }).validate(obj);
}