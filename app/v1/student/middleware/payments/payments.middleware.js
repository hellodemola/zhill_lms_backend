import { convertToNumber } from "../../../../../utils/convertNumber.js";
import { handleExpection, handleResp } from "../../../../../utils/helper.js";
import { is_course_helper } from "../../../../../utils/paystack/helper.js";
import { singleCourseValidation } from "../../../course/validations/course_update.validation.js";
import { FREE_COURSE_SUBSCRIPTION_SERVICES, IS_COURSE_SERVICES } from "../../services/courses/courses.services.js";
import { current_watch_validation, initialize_payment_validation, verify_payment_validation } from "../../validations/payment.validations.js";

export const IS_COURSE_ACTIVE_CONTROLLER = async (req, res, next) => {
    const { course_id, amount } = req.body;
    const is_course_active = await IS_COURSE_SERVICES(course_id, req.user, amount);
    const resp = is_course_helper(is_course_active);
    if (resp?.error_message) return handleResp(
        res,
        resp?.error_code,
        resp?.error_message
    );
    console.log({ id: is_course_active?.data?.student_id, is_course_active })
    req.user_id = is_course_active?.data?.student_id
    next();
};

export const FREE_COURSE_SUBSCRIPTION_CONTROLLER = async (req, res, next) => {
    try {
        if (req.body.amount > 0) return next();
        const { course_id } = req.body;
        const student_id = req.user_id;

        const create_subscriptions = await FREE_COURSE_SUBSCRIPTION_SERVICES(student_id, course_id);
        if (create_subscriptions.isError) return handleResp(
            res,
            create_subscriptions.errorCode,
            create_subscriptions.errorMessage
        );

        return handleResp(
            res,
            201,
            "Subscription created successfully",
            create_subscriptions.data
        );

    } catch (error) {
        handleExpection(next, error)
    }
}

export const VALIDATE_INTIALIZE_PAYSTACK_PAYMENT = async (req, res, next) => {
    const checkValid = initialize_payment_validation(req.body)
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_WATCH = async (req, res, next) => {
    const course_id = convertToNumber(req?.params?.course_id);
    req.course_id = course_id;
    const data = {course_id, ...req.body}
    const checkValid = current_watch_validation(data);
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}



export const VALIDATE_VERIFY_PAYSTACK_PAYMENT = async (req, res, next) => {
    const checkValid = verify_payment_validation(req.body)
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_SINGLE_COURSE_STUDENT = async (req, res, next) => {
    const { id } = req.params
    const checkValid = singleCourseValidation({ id })
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}
