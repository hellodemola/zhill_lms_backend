import { convertToNumber } from "../../../../../utils/convertNumber.js";
import { is_course_helper } from "../../../../../utils/paystack/helper.js";
import { get_random } from "../../../../../utils/random.js";
import { find_course } from "../../../course/queries/course.queries.pq.js";
import { add_free_subscription, add_subscription, course_price_query, find_subscription, find_subscription_by_studentId, get_latest_courses, is_course_active_query, is_student_subscribed_query, search_course, update_subscription_status } from "../../../course/queries/students/courses.students.queries.pq.js"
import { find_student } from "../../queries/onboarding.queries.js";

const GET_ALL_LANDING_PAGE_MATRICS_SERVICES = async () => {
    const get_latest_date = await get_latest_courses();

    let latest = get_latest_date.slice(0, 10);
    let random_10 = get_random(get_latest_date)
    let random = get_random(get_latest_date)

    const data = {
        latest_courses: latest,
        popular_courses: random_10,
        random_courses: random,
    }
    return data;
}

const SEARCH_SERVICES = async (search) => {
    const found_search = await search_course(search);
    console.log({found_search})
    if (!found_search || found_search?.length === 0) return { isError: true, errorMessage: `${search} not found!` }
    return {isError: false, data: found_search};
}

const SAVE_PAYEMENT_REF_SERVICES = async (PAYMENT_REF, STUDENT_ID, COURSE_ID, AMOUNT) => {
    const is_subscription = await find_subscription(STUDENT_ID, COURSE_ID);
    if (is_subscription) return update_subscription_status(PAYMENT_REF, is_subscription?.id, AMOUNT)

    return add_subscription(PAYMENT_REF, STUDENT_ID, COURSE_ID, AMOUNT)

};

const MY_COURSES_SERVICES = async (USER_EMAIL) => {
    const student = await find_student(USER_EMAIL);
    if (!student) return { data: { total_course: null, data: null } }
    console.log({student})
    const find_sub = await find_subscription_by_studentId(Number(student?.id));
    return {
        data : { total_course: find_sub?.length, data: find_sub }
    }
}

const FREE_COURSE_SUBSCRIPTION_SERVICES = async (STUDENT_ID, COURSE_ID) => {
    const is_subscription = await find_subscription(STUDENT_ID, COURSE_ID);
    if (is_subscription) return {
        isError: true,
        errorMessage: "Course is already subscribed",
        errorCode: 400
    };
    const create_subscription = await add_free_subscription(STUDENT_ID, COURSE_ID);
    const course = await find_course(COURSE_ID);
    return {
        isError: false,
        data: course,
    }
}

const IS_COURSE_SERVICES = async (course_id_string, student_email, amount_) => {
    let state;
    const course_id = convertToNumber(course_id_string);
    const amount = convertToNumber(amount_);
    const is_course_exist = await find_course(course_id);
    if (!is_course_exist) return state = "NOT_FOUND";
    const is_course = await is_course_active_query(course_id);
    if (!is_course) return state = "NOT_ACTIVE";
    const is_course_price_correct = await course_price_query(course_id);
    if (is_course_price_correct?.amount !== amount) {
        console.log({ is_course_price_correct, amount })

        return state = 'WRONG_PRICE';
    }
    const get_student_id = await find_student(student_email)
    const is_student_sub = await is_student_subscribed_query(course_id, get_student_id?.id);
    if (is_student_sub) return state = 'ALREADY_SUB'
    return { data: { student_id: get_student_id?.id } }

}

export {
    GET_ALL_LANDING_PAGE_MATRICS_SERVICES,
    IS_COURSE_SERVICES,
    SAVE_PAYEMENT_REF_SERVICES,
    MY_COURSES_SERVICES,
    FREE_COURSE_SUBSCRIPTION_SERVICES,
    SEARCH_SERVICES
};
