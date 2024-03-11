import { ChangePasswordSchema, LoginSchema, SendEmailCodeSchema, VerifyEmailCodeSchema, changePasswordSchema, registerSchema } from "../validations/onboarding.validations.js"

export const VALIDATE_REGISTER = (req, res, next) => {
    const checkValid = registerSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_LOGIN = (req, res, next) => {
    const checkValid = LoginSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_SEND_EMAIL_VERIFICATION = (req, res, next) => {
    const checkValid = SendEmailCodeSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_VERIFY_EMAIL_VERIFICATION = (req, res, next) => {
    const checkValid = VerifyEmailCodeSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_FORGET_PASSWORD = (req, res, next) => {
    const checkValid = SendEmailCodeSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_CHANGE_PASSWORD = (req, res, next) => {
    const email = req.user;
    const data = { ...req.body, ...{email} }
    const checkValid = changePasswordSchema(data);
    if (checkValid) return res.send(checkValid?.message);
    next();
}

export const VALIDATE_UPDATE_PASSWORD = (req, res, next) => {
    const checkValid = ChangePasswordSchema(req.body);
    if (checkValid) return res.send(checkValid?.message);
    next();
}
