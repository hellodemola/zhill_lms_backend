import bcrypt from 'bcrypt';
import  Jwt from 'jsonwebtoken';
import {
    find_student,
    find_token,
    get_all_by_date_students,
    get_all_by_date_students_counts,
    get_all_by_date_unvalidated_students_counts,
    get_all_by_date_validated_students_counts,
    new_student,
    save_token,
} from "../queries/onboarding.queries.js"
import { formatDate, paginatedResults } from '../../../../utils/helper.js';

export const FIND_STUDENT = async(email) => {
    const isStudent = await find_student(email);
    if (isStudent) return isStudent
    return false;
}

export const ADD_NEW_STUDENT = async (data) => {
    try {
        const saltRounds = 10;
        const hashPassword = bcrypt.hashSync(data?.password, saltRounds);
        const student = await new_student({ ...data, ...{ password: hashPassword } });
        return student;

    } catch (error) {
        console.log(error)
        return new Error(error)
    }

}


export const COMPARE_PASSWORD = async (username, password) => {

    try {
        const find_student = await FIND_STUDENT(username);
        if (!find_student) return false;
        const isPassword = await bcrypt.compare(password, find_student.password);
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

export const STUDENT_DASHBOARD_SERVICES = async (
    LIMIT,
    PAGE,
    START_DATE,
    END_DATE,
) => {
      const { skips, formatLimit } = paginatedResults(PAGE, LIMIT);
    const { formatStartDate, formatEndDate } = formatDate(START_DATE, END_DATE);
    const date_range = { start_date: formatStartDate, end_date: formatEndDate };

    const getAllStudent = await get_all_by_date_students(date_range, formatLimit, skips);
    const getStudentCount = await get_all_by_date_students_counts(date_range);
    const validatedStudentCount = await get_all_by_date_validated_students_counts(date_range);
    const unvalidatedStudentCount = await get_all_by_date_unvalidated_students_counts(date_range);
    const data = {
        students: getAllStudent,
        metrics: {
            total: getStudentCount,
            verified_total: validatedStudentCount,
            unverified_total: unvalidatedStudentCount,
        }
    }
    return data
}


export const SALT_PASSWORD = async (password) => {
     const saltRounds = 10
    const newPassword = await bcrypt.hash(password, saltRounds);
    return newPassword
}

export const tokenServices = (email) => Jwt.sign({
        data: email
}, process.env.SECRET_KEY || 'fallback2003', { expiresIn: '2 days' });


export const VerifyTokenServices = (email) => Jwt.sign({
        data: email
}, 'VER112', { expiresIn: '1h' });

export const decodeTokenServices = async(token) => Jwt.verify(token, 'VER112', (err, decoded) => {
        if (err) {
            console.log({err})
            return false
        }
        return decoded
    });

export const saveTokenServices = (email, token) => ''
