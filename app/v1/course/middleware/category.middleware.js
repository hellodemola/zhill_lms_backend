import { handleExpection, handleResp } from "../../../../utils/helper.js"
import { add_category_schema, update_category_schema } from "../validations/categories.validation.js"

export const ADD_CATEGORY_VALIDATION = (req, res, next) => {
    try {
        const is_new_category_wrong = add_category_schema(req.body)
        if (is_new_category_wrong) return handleResp(
            res,
            400,
            is_new_category_wrong
        );
        return next();
    } catch (error) {
        handleExpection(next, error)
    }
}

export const UPDATE_CATEGORY_VALIDATION = (req, res, next) => {
    try {
        const { id } = req.params;
        console.log({id})
        const data = { ...{id}, ...req.body }
        const is_new_category_wrong = update_category_schema(data)
        if (is_new_category_wrong) return handleResp(
            res,
            400,
            is_new_category_wrong
        );
        return next();
    } catch (error) {
        handleExpection(next, error)
    }
}
