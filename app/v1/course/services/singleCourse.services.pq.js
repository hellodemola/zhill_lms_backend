import { convertToNumber } from "../../../../utils/convertNumber.js";
import { handleResp } from "../../../../utils/helper.js";
import { find_student } from "../../student/queries/onboarding.queries.js"
import { find_lesson, find_topic } from "../queries/course.queries.pq.js";
import { find_subscription } from "../queries/students/courses.students.queries.pq.js";
import { category_course, create_current_watch, find_current_watch, find_overview_course, find_single_course_by_id, update_current_watch } from "../queries/students/singleCourse.students.queries.js";

export const GET_SINGLE_COURSE_ISLOGGED_SERVICE = async (STUDENT_EMAIL,COURSE_ID) => {
    const student = await find_student(STUDENT_EMAIL);
    const is_student_subscribed = await find_subscription(student?.id, COURSE_ID);

    if (is_student_subscribed) {
        const course = await find_single_course_by_id(
            COURSE_ID,
            is_student_subscribed?.id,
            student.id,
        );
        return {
            is_student_subscribed: true,
            course, subscription:
            is_student_subscribed
        }
    }

    const course = await find_overview_course(COURSE_ID);
    return { is_student_subscribed: false, course }
};

export const GET_SINGLE_COURSE_SERVICE = async (COURSE_ID) => {

        const course = await find_overview_course(COURSE_ID);
        return { is_student_subscribed: false, course }

};

export const FIND_COURSE_CONTENT = async (COURSE_ID, TOPIC_ID, LESSON_ID) => {
    const is_topic = await find_topic(COURSE_ID, convertToNumber(TOPIC_ID));
   if (!is_topic) return { code: 404, error: "topic not found" };
    const is_lesson = await find_lesson(LESSON_ID);
    if (!is_lesson) return { code: 404, error: "lesson not found" };
    return null;

}


export const GET_SINGLE_COURSE_CATEGORY_SERVICES = async (CATEGORY_ID) => {
    const courses = await category_course(Number(CATEGORY_ID));
    if (!courses) return null
    return courses;
}

export const UPDATE_CURRENT_WATCH_SERVICES = async (
    COURSE_ID,
    TOPIC_ID,
    STUDENT_ID,
    LESSON_ID,
    DURATION,
    SUB_ID,
) => {
    const found_watch = await find_current_watch(SUB_ID, LESSON_ID);
    if (!found_watch) {
        const new_watch = await create_current_watch(
            COURSE_ID,
            TOPIC_ID,
            STUDENT_ID,
            LESSON_ID,
            DURATION,
            SUB_ID,
        );
        return { new_watch };
    };
    const update_watch = await update_current_watch(
        found_watch.id,
        DURATION,
    )
    return { update_watch }
}
