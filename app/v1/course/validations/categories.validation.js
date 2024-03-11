import Joi from "joi";

export const add_category_schema = (request_details) => {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(3)
            .max(20)
            .required("Category name is required"),
        image_url: Joi
            .string()
            .required("Category image URL is required"),
    })

    const { error } = schema.validate(request_details);
    if (error) return { message: error.details[0].message }
    return null;
}

export const update_category_schema = (request_details) => {
    console.log({request_details})
    const schema = Joi.object({
        id: Joi.number().required("Cateogy ID is required"),
        name: Joi
            .string()
            .min(3)
            .max(20),
        image_url: Joi
            .string()
            .uri(),
    })

    const { error } = schema.validate(request_details);
    if (error) return { message: error.details[0].message }
    return null;
}
