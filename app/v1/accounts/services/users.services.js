import { add_log_queries } from "../queries/account.queries.pg.js";

export const ADD_ACTIVITY_LOG_SERVICE = async (data) => {
    try {
        return await add_log_queries(data);
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }

};
