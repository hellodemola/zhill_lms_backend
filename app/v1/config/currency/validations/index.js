import Joi from "joi";

export const AddCurrencySchema = (request) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        name: Joi.string().required(),
        symbol: Joi.string().required(),
        short_code: Joi.string().required(),
    })
    const { error } = schema.validate(request);
    if (error) return { message: error.details[0].message }
    return null;
}
