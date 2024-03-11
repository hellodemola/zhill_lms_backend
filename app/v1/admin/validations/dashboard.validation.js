// const { start_date, end_date, limit, page } = req.query;

import Joi from "joi";


export const GetDashboardSchema = (data) => {
    const schema = Joi.object({
        start_date: Joi.date().required(),
        end_date: Joi.date().required(),
        page: Joi.number(),
        limit: Joi.number(),

    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}
