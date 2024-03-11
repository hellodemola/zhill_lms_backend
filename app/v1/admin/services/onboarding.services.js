import bcrypt from 'bcrypt';
import  Jwt from 'jsonwebtoken';
import {
    find_admin,
    find_token,
    new_admin,
    save_token,
    update_admin,
} from "../queries/onboarding.queries.js"

export const FIND_ADMIN = async(email) => {
    const admin = await find_admin(email);
    if (admin) return admin
    return false;
}



export const CODED_PASSWORD = async (password) => {
    console.log(password)
    const hash = await bcrypt.hash(password, 10);
    console.log({hash})
    return hash
}

export const ADD_NEW_ADMIN = async (data) => {
    console.log({data})
    return await new_admin(data);
}


export const COMPARE_PASSWORD = async (username, password) => {
    try {
        const find_admin = await FIND_ADMIN(username);
        if (!find_admin) return false;

        const isPassword = await bcrypt.compare(password, find_admin.password);
        console.log({isPassword})
        return isPassword

    } catch (error) {
        throw new Error(error);
    }
}

export const SAVE_TOKEN_SERVICE = async (token, email) => {
    try {
        return save_token(token, email)
    } catch (error) {
        throw new Error(error)
    }

}

export const FIND_TOKEN_SERVICE = async (token) => {
    try {
        return find_token(token)
    } catch (error) {
        throw new Error(error)
    }

}

export const LOGIN_SERVICES = async (data) => {
    const { username, password } = data;
    const isUser = await FIND_ADMIN(username);
    if (!isUser) return false;

    const isPasswordCorrect = await COMPARE_PASSWORD(username, password);
    if (!isPasswordCorrect) return false;
    return true;

}


export const SALT_PASSWORD = async (password) => {
     const saltRounds = 10
    const newPassword = await bcrypt.hash(password, saltRounds);
    return newPassword
}

export const tokenServices = async(email) => Jwt.sign({
        data: email
}, process.env.SECRET_KEY, { expiresIn: '2 days' });


export const VerifyTokenServices = (email) => Jwt.sign({
        data: email
}, 'VER112', { expiresIn: '2h' });

export const decodeTokenServices = async(token) => Jwt.verify(token, 'VER112', (err, decoded) => {
        if (err) {
            console.log({err})
            return false
        }
        return decoded
    });

export const saveTokenServices = (email, token) => ''

export const UPDATE_PASSWORD = async (EMAIL, DATA) => {

    const isPassword = await COMPARE_PASSWORD(EMAIL, DATA?.old_password);
    if (!isPassword) return false;
    const hash_new_password = await CODED_PASSWORD(DATA?.new_password);
    const updated_at = new Date();
    const data = { ...{ password: hash_new_password }, ...{ updated_at } }
    const update_password = await update_admin(data, EMAIL);
    return update_password;
}
