import { COURSE_NOT_FOUND } from "../../../../utils/constant.js";
import { handleError, handleExpection, handleResp } from "../../../../utils/helper.js"
import { add_assessments, add_questions, add_quiz, add_topic_contents, find_assessments, find_single_assessment } from "../queries/course.queries.pq.js";
import { find_lesson_id } from "../queries/patch.courses.queries.pq.js";
import { ADD_COURSE_SERVICE, ADD_LESSON_SERVICES, ADD_TOPIC_SERVICE, EDIT_LESSON_SERVICES, FIND_ALL_COURSES_SERVICES, FIND_COURSE_BY_ID_SERVICE, FIND_COURSE_BY_NAME_SERVICE, FIND_TOPICS_ID_SERVICES, FIND_TOPIC_BY_NAME_SERVICE, UPDATE_COURSE_STATUS } from "../services/service.course.pq.js"
import { DELETE_LESSON_SERVICES, EDIT_QUIZ_SERVICES } from "../services/update.course.pq.js";

export const ADD_COURSE_CONTROLLER = async (req, res, next) => {
    const isCourse = await FIND_COURSE_BY_NAME_SERVICE(req.body.course_name)
    if (isCourse) return handleResp(
        res,
        400,
        "Course already exist"
    )
    try {
        const add_course = await ADD_COURSE_SERVICE({ ...req.body, user: req.tutorId })
        req.message = "Course added successfully";
        req.data = add_course;
        req.status = 201
        req.activity = `${req.user} added course: ${add_course?.name} with id:${add_course?.id}`
        next();
    } catch (error) {
        handleExpection(next, error)
    }

};

export const GET_COURSES_CONTROLLER = async (req, res, next) => {
    const { page, limit } = req.query;

    try {
        const getCourses = await FIND_ALL_COURSES_SERVICES(page, limit);
        if (!getCourses) return handleResp(res, 404, "found no courses")
        return handleResp(res, 200, "Successful", getCourses);
    } catch (error) {
        handleExpection(next, error)
    }

}

export const GET_COURSE_ID_CONTROLLER = async (req, res, next) => {
    const { id } = req.query;
    try {
        const course = await FIND_COURSE_BY_ID_SERVICE(id);
        if (!course) return handleError(res, 404, COURSE_NOT_FOUND)
        return handleResp(res,200, "Successfully", course)
    } catch (error) {
        handleExpection(next,error)
    }

}

export const GET_TOPICS_CONTROLLER = async (req, res, next) => {
    const { topic_id, id: course_id, page, limit } = req.query;
    try {
        const find_topics = await FIND_TOPICS_ID_SERVICES(Number(topic_id), Number(course_id), page, limit);
        if (find_topics.total === 0) return handleResp(res, 404, COURSE_NOT_FOUND)
        return handleResp(res, 200, "Successfully found", find_topics);
    } catch (error) {
        handleExpection(next,error)
    }

}

export const ADD_COURSE_TOPIC_CONTROLLER = async (req, res, next) => {
    const { title, topic_number } = req.body
    const { id } = req.params
    const isTopic = await FIND_TOPIC_BY_NAME_SERVICE(title, topic_number, id);
    if (isTopic) return handleResp(
        res,
        400,
        "Topic or number already exist"
    )
    try {

        const add_topic = await ADD_TOPIC_SERVICE({ ...req.body, course_id: req.course_id })
        req.message = "Course added successfully";
        req.data = add_topic;
        req.status = 201
        req.activity = `${req.tutorId} added course topic: ${add_topic.name} with id:${add_topic?.id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }


}

export const ADD_LESSON_CONTROLLER = async (req, res, next) => {
    const { topic_id } = req.params;
    try {
        const add_lessons = await ADD_LESSON_SERVICES(req.body, topic_id);
        req.message = "Lesson has been added successfully";
        req.data = add_lessons;
        req.status = 201
        req.activity = `${req.tutorId} added lesson to topic_id:${topic_id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }


}

export const EDIT_LESSON_CONTROLLER = async (req, res, next) => {
    try {
        const { lesson_id } = req.params;
        const {
            title,
            content_url,
            content_type,
            duration,
            id,
        } = req.body;

        const edit_lesson = await EDIT_LESSON_SERVICES({
            title, content_url, content_type, duration: duration
        }, id);
        if (!edit_lesson) return handleResp(res, 404, COURSE_NOT_FOUND);
        req.message = "Lesson has been updated successfully";
        req.data = edit_lesson;
        req.status = 201
        req.activity = `${req.tutorId} updated lesson to topic_id:${lesson_id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }


}

export const FIND_LESSON_CONTROLLER = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const find = await find_lesson_id(id);
        if (!find) return handleResp(res, 404, "LESSON NOT FOUND")
        next()
    } catch (error) {
        handleExpection(next,error)

    }
}

export const DELETE_LESSON_CONTROLLER = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const deleteLesson = await DELETE_LESSON_SERVICES(id);
        if (!deleteLesson) return handleResp(res, 404, "LESSON NOT FOUND")
        req.message = "Lesson has been deleted successfully";
        req.status = 201
        req.data = deleteLesson;
        req.activity = `${req.tutorId} deleted lesson to topic_id:${id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }
}



export const ADD_ASSESSMENTS_CONTROLLER = async (req, res, next) => {
    const { id } = req.params;
    const course_id = req.course_id;
    const data = { course_id, ...req.body }

    try {
        const create_assessments = await add_assessments(data);
        const create_questions = await add_questions(req.body, create_assessments?.id);
        const found = await find_single_assessment(course_id);

        console.log({ create_questions, found });


        req.message = "Assessment has been added successfully";
        req.data = found;
        req.status = 201
        req.activity = `add assessment to course:${course_id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }

}


export const ADD_QUIZ_CONTROLLER = async (req, res, next) => {
    const { id: course_id, topic_id } = req.params;
    const data = { course_id, topic_id, ...req.body }

    try {
        const create_assessments = await add_quiz(data);
       const create_questions = await add_questions(req.body, create_assessments?.id);

        console.log({ create_questions });


        req.message = "quiz has been added successfully";
        req.data = create_assessments;
        req.status = 201
        req.activity = `add quiz to course:${course_id} and topic:${topic_id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }

}

export const EDIT_QUIZ_CONTROLLER = async (req, res, next) => {
    try {
    const { id: course_id, topic_id } = req.params;

    const edit_quiz = EDIT_QUIZ_SERVICES(course_id, topic_id, req.body)

        req.message = "quiz has been added successfully";
        req.data = edit_quiz;
        req.status = 201
        req.activity = `update quiz to course:${course_id} and topic:${topic_id}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }

}


export const RESPONSE_CONTROLLER = async (req, res, next) => {
    try {
        const message = req.message;
        const data = req.data || null;
        return handleResp(res, req.status || 200, message, data)
    } catch (error) {
        handleExpection(next,error)
    }

};

export const ENABLE_COURSE_STATUS = async (req, res, next) => {
    try {
        const course_id = req.params.id;
        const find_course = await FIND_COURSE_BY_ID_SERVICE(course_id);
        if (!find_course) return handleResp(res, 404, "Course not found")
        const update_status = await UPDATE_COURSE_STATUS(course_id, req.body.status);

        req.message = "Course status enabled successfully";
        req.data = update_status;
        req.status = 201
        req.activity = `enable course:${course_id} with ${req.body.status}`
        next();

    } catch (error) {
        handleExpection(next,error)
    }
}
