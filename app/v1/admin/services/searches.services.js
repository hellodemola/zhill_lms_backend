import { find_admin_single_course, find_admin_single_student, search_admin_courses, search_admin_students } from "../queries/seaches.queries.js";

const SEARCH_COURSES_SERVICES = async(search) => {
    const found_items = await search_admin_courses(search);
    if (!found_items) return {
        isError: true,
        errorMessage: "Not found",
        errorCode: 404
    };
    return found_items;
};

const SEARCH_STUDENTS_SERVICES = async (search) => {
    console.log({search})
    const found_student = await search_admin_students(search);
     if (!found_student) return {
        isError: true,
        errorMessage: "Not found",
        errorCode: 404
    };
    return found_student;

}

const FIND_ADMIN_SINGLE_COURSE_SERVICES = async (course_id) => {
    const found_course = await find_admin_single_course(Number(course_id));
    if (!found_course) return {
        isError: true,
        errorMessage: "Not found",
        errorCode: 404
    };
    return found_course;
}

const FIND_ADMIN_SINGLE_STUDENT_SERVICES = async (student_id) => {
    const found_student = await find_admin_single_student(Number(student_id));
    if (!found_student) return {
        isError: true,
        errorMessage: "Not found",
        errorCode: 404
    };
    return found_student;
}


export {
    SEARCH_COURSES_SERVICES,
    SEARCH_STUDENTS_SERVICES,
    FIND_ADMIN_SINGLE_COURSE_SERVICES,
    FIND_ADMIN_SINGLE_STUDENT_SERVICES,
}
