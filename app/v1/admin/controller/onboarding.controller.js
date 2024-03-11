import { SEND_NOTIFICATION_MAIL } from "../../../../mail/onboarding.notification.js";
import { INCORRECT_CREDENTIAL, SUCCESSFULLY, UNAUTHORIZED_ACTION, USER_NOT_FOUND } from "../../../../utils/constant.js";
import { handleExpection, handleResp } from "../../../../utils/helper.js";
import {  update_email_password, update_email_verification } from "../queries/onboarding.queries.js";
import { ADD_NEW_ADMIN, CODED_PASSWORD, COMPARE_PASSWORD, FIND_ADMIN, FIND_TOKEN_SERVICE, LOGIN_SERVICES, SALT_PASSWORD, SAVE_TOKEN_SERVICE, UPDATE_PASSWORD, VerifyTokenServices, decodeTokenServices, tokenServices } from "../services/onboarding.services.js"

export const IS_ADMIN_EXIST_CONTROLLER = async (req, res, next) => {
    try {
        const isUser = await FIND_ADMIN(req.body.email_address);
        if (isUser) return handleResp(res, 400, `${req.body.email_address} already exist`);
        next();
    } catch (error) {
        handleExpection(next, error);
    }
}

export const CHANGE_PASSWORD_CONTROLLER = async (req, res, next) => {
    try {
        const changePassword = await UPDATE_PASSWORD(req.user, req.body);
        if (!changePassword) return handleResp(res, 400, "Incorrect Password");
        return handleResp(res, 200, SUCCESSFULLY, changePassword);

    } catch (error) {
        handleExpection(next, error);
    }

}

export const IS_ADMIN = async (req, res, next) => {
    console.log({email: req.body.email})
    try {
        const isUser = await FIND_ADMIN(req.body.email);
        if (!isUser) return handleResp(res, 404, USER_NOT_FOUND);
        next();
    } catch (error) {
        handleExpection(next, error);
    }
}

export const _IS_ADMIN = async (req, res, next) => {
    console.log({email: req.body.username})
    try {
        const isUser = await FIND_ADMIN(req.body.username);
        if (!isUser) return handleResp(res, 404, USER_NOT_FOUND);
        next();
    } catch (error) {
        handleExpection(next, error);
    }
}


export const REGISTER_CONTROLLER = async(req, res, next) => {
    try {
        const codedPassword = await CODED_PASSWORD(req.body.password)
        console.log({codedPassword})
        await ADD_NEW_ADMIN({... req.body, ...{password: codedPassword}});
        handleResp(res, 201, `${req.body.email_address} added successfully`);
    } catch (error) {
        handleExpection(next, error);
    }
}

export const LOGIN_CONTROLLER = async (req, res, next) => {
    try {
        const isUser = await LOGIN_SERVICES(req.body);
        if (!isUser) return handleResp(res, 400, INCORRECT_CREDENTIAL);
        const createToken = await tokenServices(req.body.username);
        return handleResp(res, 200, SUCCESSFULLY, { token: createToken });
    } catch (error) {
        handleExpection(next, error)
    }
}

export const IS_TUTOR_ACTIVE = async (req, res, next) => {
    try {
    const user = req.user;
    const is_user_tutor = await FIND_ADMIN(user);
    if (!is_user_tutor) return handleResp(res, 404, UNAUTHORIZED_ACTION);
    req.tutorId = is_user_tutor.id
    next();
    } catch (error) {
        handleExpection(next, error)
    }
}

export const SEND_EMAIL_VERIFICATION_CONTROLLER = async (req, res, next) => {
    const { email } = req.body;
    const isUser = req.body;
    try {


        if (isUser.isEmailVerified) return handleResp(res, 400, `${email} is already verified`);
        const generateToken = VerifyTokenServices(email);
        // save token in db
        const saveToken = await SAVE_TOKEN_SERVICE(generateToken, email);
        if (!saveToken) return handleResp(res, 400, 'something went wrong');
        // send email
        const send_email = await SEND_NOTIFICATION_MAIL(email, isUser.first_name, generateToken, 'EMAIL_VERIFICATION', 'admin')
        return handleResp(
            res,
            200,
            `Token sent successfully to ${email}`,
        )
    }
    catch (error) {
        handleExpection(next, error)
    }

}

export const EMAIL_VERIFICATION_CONTROLLER = async (req, res, next) => {
    try {
        const { token } = req.body;
        const isToken = await FIND_TOKEN_SERVICE(token);
        const isvalid = await decodeTokenServices(isToken?.token);
        if (!isvalid) return handleResp(res, 400, 'Expired token');
        // validate email address
        const validate_email = await update_email_verification(isToken?.user, true);
        if (!validate_email) return handleResp(res, 400, 'Something went wrong');
        return handleResp(res, 200, 'Successful', {verification: validate_email?.isEmailVerified});
    } catch (error) {
        return handleExpection(next, error);
    }
}


export const SEND_FORGET_PASSWORD_CONTROLLER = async (req, res, next) => {
    try {
        const { email } = req.body;
        const isUser = await FIND_ADMIN(email);
        if (!isUser) return handleResp(
            res,
            404,
            'User not found');
        const generateToken = VerifyTokenServices(email);
        // save token in db
        const saveToken = await SAVE_TOKEN_SERVICE(generateToken, email);
        if (!saveToken) return handleResp(res, 400, 'something went wrong');
        // send email
        const send_email = await SEND_NOTIFICATION_MAIL(email, isUser.first_name, generateToken, 'FORGET_PASSWORD_REDIRECT', 'admin')
        return handleResp(
            res,
            200,
            `Resent password token sent successfully to ${email}`,
        )
    }
    catch (error) {
        handleExpection(next, error)
    }

}

export const FORGET_PASSWORD_CONTROLLER = async (req, res, next) => {
    try {
        const { token, password } = req.body;
        const isToken = await FIND_TOKEN_SERVICE(token);
        const isvalid = await decodeTokenServices(isToken?.token);
        if (!isvalid) return handleResp(res, 400, 'Expired token');

        // validate email address
        const password_salt = await SALT_PASSWORD(password);
        const validate_email = await update_email_password(isToken?.user, password_salt);
        if (!validate_email) return handleResp(res, 400, 'Something went wrong');
        return handleResp(res, 200, 'Password reset successful');
    } catch (error) {
        return handleExpection(next, error)
    }
}
