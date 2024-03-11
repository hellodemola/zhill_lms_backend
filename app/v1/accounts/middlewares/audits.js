import { ADD_ACTIVITY_LOG_SERVICE } from "../services/users.services.js";

export const ACTIVITY_AUIT = async (req, res, next) => {


    try {
        const activity = req.activity;
        const tutorId = req.tutorId
        const data = { activity, tutorId }
        const add_actitity = await ADD_ACTIVITY_LOG_SERVICE(data);
        console.log(add_actitity);
        next();
    } catch (error) {
        console.log({error})
        throw new Error(error)
    }

};
