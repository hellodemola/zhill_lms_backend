import { USER_NOT_FOUND } from "../../../../utils/constant.js";
import { handleResp } from "../../../../utils/helper.js";
import  Jwt  from 'jsonwebtoken';

export const CHECK_USER  = (req, res, next) => {
    try {
    const bearerToken = req.header('Authorization');

        if (!bearerToken) {
            req.decode = null;
            req.user = null;
            return next();
        }

    const formatToken = bearerToken.replace('Bearer ', "");

        Jwt.verify(formatToken, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                req.decode = null;
                req.user = null;
                return next();
            }
            req.decoded = decode;
            req.user = decode.data;
            return next();
        });

    } catch (error) {
        console.log({error})
        return handleResp(
            res,
            400,
            error
        );
    }
};

export const VALIDATE_LOGIN_USER = (req, res, next) => {
    try {
    const bearerToken = req.header('Authorization');
        if (!bearerToken) return handleResp(res, 400, USER_NOT_FOUND);

    const formatToken = bearerToken.replace('Bearer ', "");
    const decode = Jwt.verify(formatToken, process.env.SECRET_KEY);
    req.decoded = decode;
    req.user = decode.data;
    return next()

    } catch (error) {
        console.log({error})
        return handleResp(
            res,
            401,
            "Your session is not valid, please login in"
        );
    }
};

export const USER_IS = (req, res, next) => {
    console.log(req.user)
    next();
}
