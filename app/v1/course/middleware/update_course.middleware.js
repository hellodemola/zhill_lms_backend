import { handleResp } from "../../../../utils/helper.js";
import { EditCourseSchema, EditTopicsSchema } from "../validations/course_update.validation.js";

export const VALIDATE_EDIT_COURSE = async (req, res, next) => {
    const { id } = req.params;
    console.log({ id })
    const data = { id, ...req.body }
    console.log({data})
    const checkValid = EditCourseSchema(data);
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}

export const VALIDATE_EDIT_TOPIC_COURSE = async (req, res, next) => {
    const { id, topic_id } = req.params;
    const data = { id, topic_id, ...req.body }
    const checkValid = EditTopicsSchema(data);
    if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();
}
