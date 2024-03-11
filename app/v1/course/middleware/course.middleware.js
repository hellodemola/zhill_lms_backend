import { COURSE_NOT_FOUND, TOPIC_NOT_FOUND } from "../../../../utils/constant.js";
import { handleError, handleResp } from "../../../../utils/helper.js";
import { FIND_ASSESSMENT, FIND_COURSE_BY_ID_SERVICE, FIND_QUIZ, FIND_TOPIC_BY_ID_SERVICES } from "../services/service.course.pq.js";
import { AddAssessmentSchema, AddCourseSchema, AddLessonSchema, AddQuizSchema, AddTopicSchema, ChangeCourseStatusSchema, EditLessonSchema, EditQuizSchema, GetCoursesSchema, GetSingleCourseSchema, GetTopicsSchema } from "../validations/course.validations.js"

export const VALIDATE_ADD_COURSE = async (req, res, next) => {
    const checkValid = AddCourseSchema(req.body);
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const IS_COURSE_MIDDLEWARE = async (req, res, next) => {
    const { id } = req.params;
    try {
        const isCourse = await FIND_COURSE_BY_ID_SERVICE(id)
        if (!isCourse) return handleResp(res, 404, COURSE_NOT_FOUND)
        req.course_id = isCourse.id
        next();
    } catch (error) {
        handleError(error)
    }
}

export const IS_COURSE_QUERY_MIDDLEWARE = async (req, res, next) => {
    const { id } = req.query;
    try {
        const isCourse = await FIND_COURSE_BY_ID_SERVICE(id)
        if (!isCourse) return handleResp(res, 404, COURSE_NOT_FOUND)
        req.course_id = isCourse.id
        next();
    } catch (error) {
        handleError(error)
    }
}

export const IS_ASSESSMENTS_MIDDLEWARE = async (req, res, next) => {
    const course_id = req.course_id;
    try {
        const isAssessment = await FIND_ASSESSMENT(course_id);
        console.log({ isAssessment })
        if (isAssessment) return handleResp(res, 400, "Assessment already exist")
        next();
    } catch (error) {
        handleError(error)
    }

}

export const IS_QUIZ_MIDDLEWARE = async (req, res, next) => {
    // const course_id = req.course_id;
    const { id, topic_id } = req.params;
    try {
        const isQuiz = await FIND_QUIZ(id, topic_id);
        console.log({ isQuiz })
        if (isQuiz) return handleResp(res, 400, "Quiz for this topic already exist")
        next();
    } catch (error) {
        handleError(error)
    }

}

export const IS_QUIZ_EXIT_MIDDLEWARE = async (req, res, next) => {
    // const course_id = req.course_id;
    const { id, topic_id } = req.params;
    try {
        const isQuiz = await FIND_QUIZ(id, topic_id);
        console.log({ isQuiz })
        if (!isQuiz) return handleResp(res, 404, "Quiz for this topic does not exist")
        next();
    } catch (error) {
        handleError(error)
    }

}

export const IS_TOPIC_MIDDLEWARE = async (req, res, next) => {
    const { id: course_id ,topic_id } = req.params;
    try {
        const isTopic = await FIND_TOPIC_BY_ID_SERVICES(course_id, topic_id);
        if (!isTopic) return handleResp(res, 404, TOPIC_NOT_FOUND)
        req.topic_id = isTopic.id
        next();
    } catch (error) {
        handleError(error)
    }

}

export const VALIDATE_ADD_TOPIC = async (req, res, next) => {
    const { id } = req.params;
    const { title, topic_number, introduction_video } = req.body;
    const data = { id, title, topic_number, introduction_video }
    const checkValid = AddTopicSchema(data);
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_ADD_LESSION = async (req, res, next) => {
    const {
        id,
        topic_id
    } = req.params;
    const checkValid = AddLessonSchema({...req.body, id, topic_id})
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}
export const VALIDATE_EDIT_LESSION = async (req, res, next) => {
    const {
        id,
    } = req.params;
    const checkValid = EditLessonSchema({...req.body, id})
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_ADD_ASSESSMENT = async (req, res, next) => {
    const { id } = req.params;
    const checkValid = AddAssessmentSchema({ ...req.body, id });
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}

export const VALIDATE_ADD_QUIZ = async (req, res, next) => {
    const { id, topic_id } = req.params;
    const checkValid = AddQuizSchema({ ...req.body, topic_id, id });
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}

export const VALIDATE_EDIT_QUIZ = async (req, res, next) => {
    const { id, topic_id } = req.params;
    const checkValid = EditQuizSchema({ ...req.body, topic_id, id });
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}

export const VALIDATE_CHANGE_STATUS = async (req, res, next) => {
    const { id } = req.params;
     const checkValid = ChangeCourseStatusSchema({ ...req.body, id });
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_GET_TOPICS = async (req, res, next) => {
    const checkValid = GetTopicsSchema(req.query);
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}

export const VALIDATE_GET_COURSES = async (req, res, next) => {
    const checkValid = GetCoursesSchema(req.query);
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}

export const VALIDATE_GET_SINGLE_COURSE = async (req, res, next) => {
    const checkValid = GetSingleCourseSchema(req.query);
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}
