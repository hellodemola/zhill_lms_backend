import Joi from "joi";

export const EditCourseSchema = (request) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        course_name: Joi.string().required(),
        course_description: Joi.string().required(),
        course_image_url: Joi.string().uri().required(),
        course_benefits: Joi.string().required(),
    })
    const { error } = schema.validate(request);
    if (error) return { message: error.details[0].message }
    return null;
}
export const EditTopicsSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        topic_id: Joi.number().required(),
        title: Joi.string(),
        topic_no: Joi.number(),

    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}

export const singleCourseValidation = (req) => {
    const schema = Joi.object({
        id: Joi.number().required()
    })
    const { error } = schema.validate(req);
    if (error) return { message: error.details[0].message }
    return null;
}
