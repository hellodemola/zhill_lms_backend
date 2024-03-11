import { formatDate, paginatedResults } from "../../../../utils/helper.js"
import { get_all_by_date_courses, get_all_by_date_courses_counts, get_subscription_date, } from "../../course/queries/course.queries.pq.js";
import { get_all_by_date_students, get_all_by_date_students_counts } from "../../student/queries/onboarding.queries.js";

export const config_basic_inputs = (
    START_DATE,
    END_DATE,
    LIMIT,
    PAGE,
) => {
     const { skips, formatLimit } = paginatedResults(PAGE, LIMIT);
    const { formatStartDate, formatEndDate } = formatDate(START_DATE, END_DATE);
    const date_range = { start_date: formatStartDate, end_date: formatEndDate };

    return { skips, formatStartDate, formatEndDate, formatLimit, date_range }
}

export const GET_DASHBOARD_DATA_BY_DATE = async (
    START_DATE,
    END_DATE,
    LIMIT,
    PAGE) => {

        const {
        skips,
        formatStartDate,
        formatEndDate,
        formatLimit,
        date_range
    } = config_basic_inputs(START_DATE, END_DATE, LIMIT, PAGE);

    if (!formatStartDate || !formatEndDate) return null;

    const students = await get_all_by_date_students(date_range, formatLimit, skips);
    const students_count = await get_all_by_date_students_counts (date_range)
    const courses = await get_all_by_date_courses(date_range, formatLimit, skips);
    const courses_count = await get_all_by_date_courses_counts(date_range);
    const subscriptions = await get_subscription_date(date_range);

    const data = {
            students:{ total: students_count, students },
            courses: { total: courses_count, courses },
            earnings: { total: subscriptions?._sum?.amount || 0 },
            certificate: { total: subscriptions?._count?.isComplete || 0 }
        }


    return data

}

export const GET_COURSE_DASHBOARD_BY_DATE = async (
    START_DATE,
    END_DATE,
    LIMIT,
    PAGE,
) => {

    const {
        skips,
        formatStartDate,
        formatEndDate,
        formatLimit,
        date_range
    } = config_basic_inputs(START_DATE, END_DATE, LIMIT, PAGE);

    const courses = await get_all_by_date_courses(date_range, formatLimit, skips);
    const courses_count = await get_all_by_date_courses_counts(date_range);
    const subscriptions = await get_subscription_date(date_range);


    if (!formatStartDate || !formatEndDate) return null;

        const data = {
            courses: {
                courses,
                total: courses_count
            },
            views: {
                in_progress: subscriptions._count.id - subscriptions._count.isComplete,
                completed: subscriptions._count.isComplete,
                total: subscriptions._count.id
            },
            earnings: { total: subscriptions._sum.amount },
            cerficate: { total: subscriptions._count.isComplete },
        }

    return data;


}
