import { handleExpection, handleResp } from "../../../../utils/helper.js"
import { ADD_CATEGORY_SERVICE, ADD_CATEGORY_TO_COURSE_SERVICE, FIND_CATEGORY_SERVICE, FIND_SINGLE_CATEGORY_SERVICE, UPDATE_CATEGORY_SERVICE } from "../services/categories.services.pq.js"

export const ADD_CATEGORY_CONTROLLER = async (req, res, next) => {
    try {

        const add_new_category = await ADD_CATEGORY_SERVICE(req.body);
        if (!add_new_category) return handleResp(
            res,
            400,
            `${req?.body?.name} already exist`
        )
        return handleResp(
            res,
            201,
            "Category added successfully",
            add_new_category
        )
    } catch (error) {
        handleExpection(next, error)
    }
};

export const UPDATE_CATEGORY_CONTROLLER = async (req, res, next) => {
    try {

        const category_details = req.body;
        const update_cat = await UPDATE_CATEGORY_SERVICE(Number(req.params.id), category_details);
        if (!update_cat) return handleResp(
            res,
            404,
            `category not found`
        )
        return handleResp(
            res,
            201,
            "Category updated successfully",
            update_cat
        )
    } catch (error) {
        handleExpection(next, error)
    }
};

export const IS_CATEGORY_CONTROLLER = async (req, res, next) => {
     try {
        const { id } = req.params;
        const found_items = await FIND_SINGLE_CATEGORY_SERVICE(Number(id));
        if (!found_items) return handleResp(
            res,
            404,
            "Category does not exist",
        );

        req.category = found_items;
        next();
    } catch (error) {
       handleExpection(next, error)
    }
}

export const FIND_CATEGORY_CONTROLLER = async (req, res, next) => {
    try {
        const found_items = await FIND_CATEGORY_SERVICE();
        return handleResp(
            res,
            200,
            "Successfully",
            found_items
        )
    } catch (error) {
       handleExpection(next, error)
    }
}

export const ADD_CATEGORY_TO_COURSE_CONTROLLER = async (req, res, next) => {
    try {
        const { category_id, course_id } = req.body
        const is_category = await FIND_SINGLE_CATEGORY_SERVICE(category_id);
        if (!is_category) return handleResp(
            res,
            404,
            "Category does not exist",
        );
        const add_course_cat = await ADD_CATEGORY_TO_COURSE_SERVICE(category_id, course_id);
        return handleResp(
            res,
            201,
            "Successfully",
            add_course_cat
        )

    } catch (error) {
        handleExpection(next, error)
    }
}
