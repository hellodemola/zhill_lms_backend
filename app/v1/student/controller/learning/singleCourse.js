import { convertToNumber } from "../../../../../utils/convertNumber.js";
import { handleExpection, handleResp } from "../../../../../utils/helper.js"
import { FIND_COURSE_CONTENT, GET_SINGLE_COURSE_CATEGORY_SERVICES, GET_SINGLE_COURSE_ISLOGGED_SERVICE, GET_SINGLE_COURSE_SERVICE, UPDATE_CURRENT_WATCH_SERVICES } from "../../../course/services/singleCourse.services.pq.js"
import { find_student } from "../../queries/onboarding.queries.js";

export const SINGLE_COURSE_USER_CONTROLLER = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = req?.user;
        const course_id = Number(id);

        if (user) {
            const singleCourse = await GET_SINGLE_COURSE_ISLOGGED_SERVICE(user, course_id);
            if (!singleCourse) return handleResp(
                res,
                404,
                "Course not found"
            );
            return handleResp(
                res,
                200,
                "Successful",
                singleCourse,
            )
        }

        const singleCourse = await GET_SINGLE_COURSE_SERVICE(course_id);
         if (!singleCourse) return handleResp(
                res,
                404,
                "Course not found"
            );
            return handleResp(
                res,
                200,
                "Successful",
                singleCourse,
            )

    } catch (error) {
        handleExpection(next, error)
    }
}

export const SINGLE_CATEGORIES_COURSES = async (req, res, next) => {
    try {
        const courses = await GET_SINGLE_COURSE_CATEGORY_SERVICES(req?.params?.id);
        if (!courses) return handleResp(
            res,
            404,
            "Category Courses not found"
        );

        return handleResp(
            res,
            200,
            "Successful",
            { data: courses, category_id: req?.params?.id },
        )


    } catch (error) {
        handleExpection(next, error)
    }
}

export const IS_COURSE_CONTROLLER = async (req, res, next) => {
    try {
        const is_course = await GET_SINGLE_COURSE_SERVICE(req.course_id);
        if (!is_course.course) return handleResp(res, 404, "Course not avaliable");
        next();
    } catch (error) {
        handleExpection(next, error)
    }
}

export const IS_STUDENT_SUBSCRIBED = async (req, res, next) => {
    try {
        const found_student = await find_student(req.user);
        req.student_id = convertToNumber(found_student?.id);
        if (!found_student?.id)
            return handleResp(res, 400, "Not allowed, user not found");
        const is_student_sub = await GET_SINGLE_COURSE_ISLOGGED_SERVICE(
            req.user,
            req.course_id,
        );

        if (!is_student_sub.is_student_subscribed)
            return handleResp(res, 400, "Not allowed, user not subscribed");

        req.subscription = is_student_sub.subscription.id;
        next();
    } catch (error) {
        handleExpection(next, error)
    }
}

export const IS_CONTENT_CONTROLLER = async (req, res, next) => {
    try {
        const check = await FIND_COURSE_CONTENT(req.course_id, req.body.topic_id, req.body.lesson_id);
        if (check?.error) return handleResp(res, check.code, check.error)
        next()

    } catch (error) {
        handleExpection(next, error)
    }
}



export const COURSE_CURRENT_WATCH = async (req, res, next) => {
    try {
        const lesson_id = convertToNumber(req.body.lesson_id);
        const topic_id = convertToNumber(req.body.topic_id)

        const update_watch = await UPDATE_CURRENT_WATCH_SERVICES(
            req.course_id,
            topic_id,
            req.student_id,
            lesson_id,
            req.body.duration,
            req.subscription
        );

        return handleResp(res, 201, "successfully", update_watch)

    } catch (error) {
        handleExpection(next, error);
    }
}
