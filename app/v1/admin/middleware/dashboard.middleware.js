import { handleResp } from "../../../../utils/helper.js";
import { GetDashboardSchema } from "../validations/dashboard.validation.js";

export const VALIDATE_GET_DASHBOARD = async (req, res, next) => {
    const checkValid = GetDashboardSchema(req.query);
     if (checkValid) return handleResp(
        res,
        400,
        checkValid?.message
    );
    next();

}
