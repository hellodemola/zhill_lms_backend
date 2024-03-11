import { handleResp } from "../../../../../utils/helper.js";
import { AddCurrencySchema } from "../validations/index.js";

export const VALIDATE_ADD_CURRENCY = async (req, res, next) => {
    const checkValid = AddCurrencySchema(req.body);
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}
