import { handleExpection, handleResp } from "../../../../utils/helper.js"
import { EDIT_COURSE_SERVICE, EDIT_COURSE_TOPIC_SERVICE } from "../services/update.course.pq.js";

export const UPDATE_SINGLE_COURSE = async(req, res, next) => {
    try {
        const {
            id: course_id
        } = req.params;
        const {
            course_name: name,
            course_description: description,
            course_image_url: img_url,
            course_benefits: benefits,
        } = req.body;

        const data = {
            name,
            description,
            img_url,
            benefits,
        }

        if (!data) return handleResp(res, 400, 'Nothing to edit')
        const updated_data = await EDIT_COURSE_SERVICE(Number(course_id), data);
        req.activity = `Edited course id: ${course_id}, ${updated_data?.name}, `
        req.data = updated_data;
        next();
    } catch (error) {
        handleExpection(next, error)
    }

}

export const UPDATE_SINGLE_TOPIC = async (req, res, next) => {
    try {
        const updated_data = await EDIT_COURSE_TOPIC_SERVICE(Number(req.topic_id), req.body);
      req.activity = `Edited topic id: ${req.topic_id}, ${updated_data?.title}, `
        req.data = updated_data;
        next();
    } catch (error) {
        handleExpection(next, error);
    }
}
