import Joi from "joi";
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const initialize_payment_validation = (request) => {
    const schema = Joi.object({
        amount: Joi.number().integer().min(50).required(),
        course_id: Joi.number().integer().min(1).required(),
    })
    const { error } = schema.validate(request);
    if (error) return ({ message: error.details[0].message })
    return null
}

export const verify_payment_validation = (request) => {
    const schema = Joi.object({
        ref: Joi.string().min(10).max(10).required(),
    })
    const { error } = schema.validate(request);
    if (error) return ({ message: error.details[0].message })
    return null
}

export const current_watch_validation = (req) => {
    console.log({req})
    const schema = Joi.object({
        course_id: Joi.number().integer().min(1).required(),
        topic_id: Joi.number().integer().min(1).required(),
        lesson_id: Joi.number().integer().min(1).required(),
        duration: Joi.string().required()
    })
    const { error } = schema.validate(req);
    if (error) return ({ message: error.details[0].message })
    return null
}

export const add_quiz_validation = (req) => {
    console.log({req})
    const schema = Joi.object({
        course_id: Joi.number().integer().min(1).required(),
        id: Joi.number().integer().min(1).required(),
        quiz: Joi.array().items(Joi.object({
            number: Joi.number().integer().min(1).required(),
            answer: Joi.string().min(1).required()
        }))
    })
     const { error } = schema.validate(req);
    if (error) return ({ message: error.details[0].message })
    return null
}
