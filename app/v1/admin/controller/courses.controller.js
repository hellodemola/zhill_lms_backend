import { handleExpection, handleResp } from "../../../../utils/helper.js"
import { FIND_ADMIN_SINGLE_COURSE_SERVICES, FIND_ADMIN_SINGLE_STUDENT_SERVICES, SEARCH_COURSES_SERVICES, SEARCH_STUDENTS_SERVICES } from "../services/searches.services.js";

const SEARCH_COURSES_CONTROLLER = async(req, res, next) => {
    try {
        const { search } = req.query;
        if (!search) return handleResp(
            res,
            400,
            "Nothing was searched"
        );
        const found_courses = await SEARCH_COURSES_SERVICES(search);
        if (found_courses.isError) return handleResp(
            res,
            found_courses.errorCode,
            found_courses.errorMessage
        );

        return handleResp(
            res,
            200,
            "Successfully",
            found_courses
        )


    } catch (error) {
        handleExpection(next, error)
    }
}

const SEARCH_STUDENTS_CONTROLLER = async (req, res, next) => {
    try {
        const { search } = req.query;
        console.log({search})
        if (!search) return handleResp(
            res,
            400,
            "Nothing was searched"
        );
        const found_students = await SEARCH_STUDENTS_SERVICES(search);
        if (found_students.isError) return handleResp(
            res,
            found_students.errorCode,
            found_students.errorMessage
        );

        return handleResp(
            res,
            200,
            "Successfully",
            found_students
        )

    } catch (error) {
        handleExpection(next, error)
    }
}

const FIND_STUDENT_CONTROLLER = async (req, res, next) => {
    try {
        console.log({search: "non"})
        const { id } = req.params;
        if (!id) return handleResp(
            res,
            400,
            "Nothing was searched"
        );
        const found_student = await FIND_ADMIN_SINGLE_STUDENT_SERVICES(id);
        if (found_student.isError) return handleResp(
            res,
            found_student.errorCode,
            found_student.errorMessage
        );

        return handleResp(
            res,
            200,
            "Successfully",
            found_student
        )

    } catch (error) {
        handleExpection(next, error)
    }
}

const FIND_COURSE_CONTROLLER = async(req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) return handleResp(
            res,
            400,
            "Nothing was searched"
        );
        const found_course = await FIND_ADMIN_SINGLE_COURSE_SERVICES(id);
        if (found_course.isError) return handleResp(
            res,
            found_course.errorCode,
            found_course.errorMessage
        );

        return handleResp(
            res,
            200,
            "Successfully",
            found_course
        )


    } catch (error) {
        handleExpection(next, error)
    }
}


export {
    SEARCH_COURSES_CONTROLLER,
    SEARCH_STUDENTS_CONTROLLER,
    FIND_STUDENT_CONTROLLER,
    FIND_COURSE_CONTROLLER
}
