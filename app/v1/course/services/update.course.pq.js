import { delete_lesson, edit_courses, edit_courses_topic, find_lesson_id, update_quiz } from "../queries/patch.courses.queries.pq.js"

export const EDIT_COURSE_SERVICE = async (course_id, data) => {
    const update_date = new Date();
    return await edit_courses(course_id, {...data, updated_at: update_date});
}


export const EDIT_COURSE_TOPIC_SERVICE = async (topic_id, data) => {
    const update_date = new Date();
    return await edit_courses_topic(topic_id, {...data, updated_at: update_date});
}

export const EDIT_QUIZ_SERVICES = async ( course_id, topic_id, data) => {
    const find = find_quiz(course_id, topic_id);
    if (!find) return false;
    const update = update_quiz(course_id, topic_id, data);
    return update;
}

export const DELETE_LESSON_SERVICES = async (lesson_id) => {
    const find = find_lesson_id(lesson_id);
    if (!find) return false;
    const deleteLesson = delete_lesson(lesson_id);
    return deleteLesson;

}


