import { handleError, handleExpection, handleResp } from "../../../../../utils/helper.js";
import { ADD_CURRENCY_SERVICES, FIND_ALL_CURRENCY_SERVICES } from "../services/currency.services.js";

export const ADD_CURRENCY = async(req, res, next) => {
    try {
    const add_currency = await ADD_CURRENCY_SERVICES(req.body);
        if (!add_currency) return handleResp(
            res,
            400,
            "Currency already exist",
        )
        req.message = "Successfully added";
        req.data = add_currency;
        req.status = 201
        req.activity = `${req.tutorId} added currency:${add_currency.id}`
        next();
    } catch (error) {
       handleExpection(next, error)
    }
};

export const GET_ALL_CURRENCY = async (req, res, next) => {
    try {
        const get_currencies = await FIND_ALL_CURRENCY_SERVICES();
        return handleResp(
            res,
            200,
            "Successfully",
            get_currencies,
        )

    } catch (error) {
        handleExpection(next, error);
    }
}
