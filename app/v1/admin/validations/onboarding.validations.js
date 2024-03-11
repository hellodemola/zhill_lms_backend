import Joi from "joi";
import { joiPasswordExtendCore } from 'joi-password';

const joiPassword = Joi.extend(joiPasswordExtendCore);

export const registerSchema = (request) => {
    const schema = Joi.object({
        first_name: Joi.string().min(3).required(),
        last_name: Joi.string().min(3).required(),
        email_address: Joi.string().email().required(),
        password: joiPassword
                        .string()
                        .min(6)
                        .minOfSpecialCharacters(1)
                        .minOfLowercase(2)
                        .minOfUppercase(1)
                        .minOfNumeric(1)
                        .noWhiteSpaces()
                        .onlyLatinCharacters()
                        .required()
    })
    const { error } = schema.validate(request);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}

export const LoginSchema = (credentials) => {
    const schema = Joi.object({
        username: Joi.string().email().required(),
        password: Joi.string().min(6)
    })

    const { error } = schema.validate(credentials);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}

export const changePasswordSchema = (credentials) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        new_password: Joi.string().min(6).required(),
        old_password: Joi.string().required()
    })

    const { error } = schema.validate(credentials);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}

export const SendEmailCodeSchema = (request) => {
    const schema = Joi.object({
        email: Joi.string().email().required()
    })

    const { error } = schema.validate(request);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}

export const VerifyEmailCodeSchema = (request) => {
    const schema = Joi.object({
        token: Joi.string().required(),
        // code: Joi.string().min(4).max(4).required(),
    })

    const { error } = schema.validate(request);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}

export const ChangePasswordSchema = (request) => {
    const schema = Joi.object({
        password: Joi.string().min(6),
        token: Joi.string().required(),
    })

    const { error } = schema.validate(request);
    if (error) {
     return ({message: error.details[0].message});
    }

    return null;
}
