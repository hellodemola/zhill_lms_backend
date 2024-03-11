import { handleError, paginatedResults } from "../../../../utils/helper.js"
import { GET_COURSE_ID_CONTROLLER } from "../controller/course.controller.js";
import { add_course, add_price, add_topic, add_topic_contents, edit_lesson, find_all_topics, find_assessments, find_course, find_course_by_name, find_courses, find_lesson, find_quiz, find_single_assessment, find_topic, find_topic_by_name, find_topic_by_number, find_total_course, find_total_topics } from "../queries/course.queries.pq.js"
import { edit_courses } from "../queries/patch.courses.queries.pq.js";

export const ADD_COURSE_SERVICE = async (NEW_COURSE) => {
    try {
        const add = await add_course(NEW_COURSE);
        const add_amount  = await add_price(
            {
                course_id: Number(add?.id),
                amount: Number(NEW_COURSE?.amount),
                currency_id: Number(NEW_COURSE?.currency_id),
            }
        )
        const getCourse = await find_course(add.id);
        const data = {
            ...getCourse,
            ...{ amount: add_amount.amount },
        }
        return data;
    } catch (error) {
        handleError(error)
    }

};

export const ADD_TOPIC_SERVICE = async (NEW_COURSE) => {
    try {
        return await add_topic(NEW_COURSE);
    } catch (error) {
        handleError(error)
    }

};

export const ADD_ASSESSMENTS = async (ASSESSMENT) => {
    try {

    } catch (error) {
        handleError(error)
    }
}

export const FIND_ASSESSMENT = async (COURSE_ID) => {

    try {
        const finds = await find_single_assessment(COURSE_ID);
        return finds;
    } catch (error) {
        handleError(error)
    }
}

export const FIND_QUIZ = async (COURSE_ID, TOPIC_ID) => {

    try {
        const finds = await find_quiz(COURSE_ID, TOPIC_ID);
        return finds;
    } catch (error) {
        handleError(error)
    }
}

export const FIND_COURSE_BY_NAME_SERVICE = async (COURSE_NAME) => {
    try {
        const found_course = await find_course_by_name(COURSE_NAME);
        if (!found_course) return false;
        return found_course;
    } catch (error) {
        handleError(error)
    }
};

export const FIND_ALL_COURSES_SERVICES = async (page, limit) => {
    try {
        const { skips, formatLimit } = paginatedResults(page, limit);
        const foundCourse = await find_courses(
            skips,
            formatLimit
        );
        const totalCourse = await find_total_course();
        const data = { course: foundCourse, total: totalCourse }
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const FIND_TOPICS_ID_SERVICES = async (topicId, courseId, page, limit) => {

    try {
        const { skips, formatLimit } = paginatedResults(page, limit);
        const foundTopics = await find_all_topics(
            skips,
            formatLimit,
            courseId,
            topicId,
        );
        const totalTopics = await find_total_topics(courseId, topicId);
        console.log({ foundTopics, totalTopics })
        const data = { course: foundTopics, total: totalTopics }
        return data;
    } catch (error) {
        handleError(error)
    }
}

export const ADD_LESSON_SERVICES = async (data, topic_id) => {
    try {
        return await add_topic_contents(data, topic_id)

    } catch (error) {
        handleError(error)
    }
}

export const EDIT_LESSON_SERVICES = async (data, lesson_id) => {
    const find = await find_lesson(lesson_id);
    if (!find) return null;
    const edit = await edit_lesson(data, lesson_id);
    return edit;
}

export const FIND_TOPIC_BY_NAME_SERVICE = async (TOPIC_NAME, TOPIC_NUMBER, COURSE_ID) => {

 try {
     const found_topic = await find_topic_by_name(TOPIC_NAME,);
     const is_topic_number = await find_topic_by_number(TOPIC_NUMBER, Number(COURSE_ID));
     if (!is_topic_number && !found_topic) return false;
     const result = found_topic || is_topic_number;
        return result;
    } catch (error) {
        handleError(error)
    }

}

export const FIND_COURSE_BY_ID_SERVICE = async (COURSE_ID) => {
    const num_id = Number(COURSE_ID)
    const found_course = await find_course(num_id);
    if (!found_course) return false;
    return found_course;
};

export const FIND_TOPIC_BY_ID_SERVICES = async (COURSE_ID, TOPIC_ID) => {
    const topic_id = Number(TOPIC_ID);
    const course_id = Number(COURSE_ID);
    try {
        const found_topic = await find_topic(course_id, topic_id);
        if (!found_topic) return false;
        return found_topic;
    } catch (error) {
       handleError(error)
    }

}

export const UPDATE_COURSE_STATUS = async (COURSE_ID, STATUS) => {
    const course_id = Number(COURSE_ID);
    const edit = await edit_courses(course_id, { status: STATUS, updated_at: new Date ()});
    return edit;
}
