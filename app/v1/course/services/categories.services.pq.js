import { add_category, add_catory_cat, find_all_categories, find_course_cat, find_single_category_by_id, find_single_category_by_name, update_single_category } from "../queries/categories/categories.queries.js"
import { find_course } from "../queries/course.queries.pq.js";

export const ADD_CATEGORY_SERVICE = async(category_details) => {
    const is_category = await find_single_category_by_name(category_details?.name);
    if (is_category) return null;
    return await add_category(category_details)
}

export const UPDATE_CATEGORY_SERVICE = async (category_id, categoryDetails) => {
    const is_category = await find_single_category_by_id(category_id);
    if (!is_category) return null;
    const update = await update_single_category(category_id, categoryDetails);
    return update;
}

export const FIND_CATEGORY_SERVICE = async () => await find_all_categories();

export const FIND_SINGLE_CATEGORY_SERVICE = async(category_id) => await find_single_category_by_id(category_id)

export const ADD_CATEGORY_TO_COURSE_SERVICE = async (
    category_id,
    course_id,
) => {
    const is_course = await find_course(Number(course_id));
    if (!is_course) throw new Error("Course does not exist");
    const is_category = await find_course_cat(Number(course_id), Number(category_id));
    if (is_category) throw new Error("Category already exist");
    const add_category = await add_catory_cat(Number(course_id), Number(category_id));
    return add_category;
}
