import { SEND_NOTIFICATION_MAIL } from "../../../../mail/onboarding.notification.js";
import { SEND_RESET_PASSWORD_MAIL } from "../../../../mail/reset-password/reset-password.mail.js";
import { INCORRECT_CREDENTIAL, SUCCESSFULLY, USER_NOT_FOUND } from "../../../../utils/constant.js";
import { handleExpection, handleResp } from "../../../../utils/helper.js";
import { update_email_password, update_email_verification } from "../queries/onboarding.queries.js";
import { ADD_NEW_STUDENT, COMPARE_PASSWORD, FIND_STUDENT, FIND_TOKEN_SERVICE, SALT_PASSWORD, SAVE_TOKEN_SERVICE, VerifyTokenServices, decodeTokenServices, tokenServices } from "../services/onboarding.services.js"

export const REGISTER_CONTROLLER = async(req, res) => {
    try {
        const isUser = await FIND_STUDENT(req.body.email_address);
        if (isUser) return handleResp(res, 400, `${req.body.email_address} already exist`);
       await ADD_NEW_STUDENT(req.body);
        return handleResp(res,201,{ message: `${req.body.email_address} added successfully`});
    } catch (error) {
        return handleResp(res, 500, { message: 'something went wrong', error })
    }
}

export const LOGIN_CONTROLLER = async (req, res, next) => {
    try {
        const { username, password } = req.body;
    const isUser = await FIND_STUDENT(username);
    if (!isUser) return handleResp(res, 400, INCORRECT_CREDENTIAL);
    const isPasswordCorrect = await COMPARE_PASSWORD(username, password);
    if (!isPasswordCorrect) return handleResp(res, 400, INCORRECT_CREDENTIAL);
        const createToken = tokenServices(username);
        const user = { email: isUser?.email, names: { first_name: isUser?.first_name, last_name: isUser.last_name, } }
    return handleResp(res, 200, SUCCESSFULLY, { token: createToken, user });
    } catch (error) {
        handleExpection(next, error)
    }
}

export const SEND_EMAIL_VERIFICATION_CONTROLLER = async (req, res) => {
    try {
        const { email } = req.body;
    const isUser = await FIND_STUDENT(email);
    if (!isUser) return handleResp(res, 404, USER_NOT_FOUND);
    if (isUser.isEmailVerified) return handleResp(res, 400, `${email} is already verified`);
    const generateToken = VerifyTokenServices(email);
    // save token in db
    const saveToken = await SAVE_TOKEN_SERVICE(generateToken, email);
    if (!saveToken) return handleResp(res, 400, 'something went wrong');
    // send email
    const send_email = await SEND_NOTIFICATION_MAIL(email, isUser.first_name, generateToken)
    return handleResp(
        res,
        200,
        `Token sent successfully to ${email}`,
    )

    } catch (error) {
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
        return handleResp(res, 400, `${error} or something went wrong`);
    }
}


export const SEND_FORGET_PASSWORD_CONTROLLER = async (req, res, next) => {
    const { email } = req.body;
    const isUser = await FIND_STUDENT(email);
    if (!isUser) return handleResp(
        res,
        404,
        'User not found');
    const generateToken = VerifyTokenServices(email);
    // save token in db
    const saveToken = await SAVE_TOKEN_SERVICE(generateToken, email);
    if (!saveToken) return handleResp(res, 400, 'something went wrong');
    // send email
    const send_email = await SEND_RESET_PASSWORD_MAIL(email, isUser.first_name, generateToken,'FORGET_PASSWORD_REDIRECT')
    return handleResp(
        res,
        200,
        `Resent password token sent successfully to ${email}`,
    )

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
        return handleResp(res, 400, `${error} or something went wrong`);
    }
}
