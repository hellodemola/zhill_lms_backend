import { handleError, handleExpection, handleResp } from "../../../../utils/helper.js"
import { STUDENT_DASHBOARD_SERVICES } from "../../student/services/onboarding.services.js";
import { GET_COURSE_DASHBOARD_BY_DATE, GET_DASHBOARD_DATA_BY_DATE } from "../services/dashboard.services.js"

export const DASHBOARD_CONTROLLER = async (req, res, next) => {
    const { start_date, end_date, limit, page } = req.query;
    try {
        const dashboardData = await GET_DASHBOARD_DATA_BY_DATE(
            start_date,
            end_date,
            limit,
            page);

        if (!dashboardData) return handleResp(
            res,
            404,
            "Data for this range not found")
        return handleResp(
            res,
            200,
            "Successful",
            dashboardData
        );

 } catch (error) {
        handleExpection(next, error);
 }
}

export const DASHBOARD_COURSES_CONTROLLER = async (req, res, next) => {
    const { start_date, end_date, limit, page } = req.query;
    try {
        const courseDashboard = await GET_COURSE_DASHBOARD_BY_DATE(
            start_date,
            end_date,
            limit,
            page);

        if (!courseDashboard) return handleResp(
            res,
            404,
            "Data for this range not found")
        return handleResp(
            res,
            200,
            "Successful",
            courseDashboard
        );

 } catch (error) {
        handleExpection(next, error);
 }
}

export const DASHBOARD_STUDENTS_CONTROLLER = async (req, res, next) => {
    const { start_date, end_date, limit, page } = req.query;
    try {
        const studentData = await STUDENT_DASHBOARD_SERVICES(
            limit,
            page,
            start_date,
             end_date,
        )

         if (!studentData) return handleResp(
            res,
            404,
            "Data for this range not found")
        return handleResp(
            res,
            200,
            "Successful",
            studentData
        );
    } catch (error) {
        handleExpection(next, error)
    }

}
