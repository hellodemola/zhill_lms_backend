import { handleExpection, handleResp } from "../../../../../utils/helper.js";
import { CALCULATE_CANDIDATE_SCORE_SERVICE, GET_STUDENT_ID_SERVICE, IS_QUIZ_SERVICE, IS_STUDENT_SUBSCRIBED_SERVICES, UPDATE_SUBSCRIPTION_SERVICE } from "../../services/courses/quiz.services.js";
import { add_quiz_validation } from "../../validations/payment.validations.js";

const VALIDATE_QUIZ_MIDDLEWARE = async (req, res, next) => {
    try {
        const { id } = req.params;
        const validate = add_quiz_validation({ ...{id}, ...req.body });
        if (validate) return handleResp(res, 400, validate);
        return next();
    } catch (error) {

    }
}

const STUDENT_INFO_MIDDLEWARE = async (req, res, next) => {
    try {
        const student = await GET_STUDENT_ID_SERVICE(req.user);
        if (!student) return handleResp(res, 404, "Student not found")
        req.student = student;
        next()
    } catch (error) {
        handleExpection(next, error)
    }
}

const IS_STUDENT_SUBSCRIBED_CONTROLLER = async (req, res, next) => {
    try {
        console.log(req.student, req.body.course_id)
        const is_candidate_sub = await IS_STUDENT_SUBSCRIBED_SERVICES(req.student, Number(req.body.course_id));
        if (!is_candidate_sub) return handleResp(
            res,
            400,
            "USER NOT SUBSCRIBED")
        req.sub = is_candidate_sub;
        return next();
    } catch (error) {
        handleExpection(next, error)
    }
}

const IS_ASSESSMENT_MIDDLEWARE = async (req, res, next) => {
try {
        const is_quiz = await IS_QUIZ_SERVICE(Number(req.params.id));
    if (!is_quiz) return handleResp(
        res,
        404,
        'Not found');
        req.quiz = is_quiz;
        if (is_quiz.course_id && !is_quiz.topic_id) req.isFinal = true
        return next();
    } catch (error) {
        handleExpection(next, error)
    }
}


const CALCULATE_CANDIDATE_SCORE_CONTROLLER = async (req, res, next) => {
    try {

        console.log(req.body.quiz, req.quiz, req.student)

        const candidate_scores = await CALCULATE_CANDIDATE_SCORE_SERVICE(
            req.body.quiz,
            req.quiz,
            req.student
        );

        if (candidate_scores.isError) return handleResp(
            res,
            candidate_scores.code || 400,
            candidate_scores.error_message);

        console.log({
            final: req.isFinal,
            isPass: candidate_scores.data.isPass
        });

        if (req.isFinal && candidate_scores.data.isPass) {
            req.data = candidate_scores;
            return next();
        }


        return handleResp(
            res,
            201,
            "Successfully",
            candidate_scores.data,
    )

    } catch (error) {
        handleExpection(next, error)
    }
}

const CANDIDATE_CREATE_CERTIFICATE = async (req, res, next) => {
    try {
        console.log({ sub: req.sub })
        const update = await UPDATE_SUBSCRIPTION_SERVICE(req.sub?.id);
        console.log({ update });
        return handleResp(
            res,
            201,
            "Successfully",
            req.data.data,
    )

    } catch (error) {
        handleExpection(next, error);
    }
}







export {
    CALCULATE_CANDIDATE_SCORE_CONTROLLER,
    CANDIDATE_CREATE_CERTIFICATE,
    IS_ASSESSMENT_MIDDLEWARE,
    IS_STUDENT_SUBSCRIBED_CONTROLLER,
    STUDENT_INFO_MIDDLEWARE,
    VALIDATE_QUIZ_MIDDLEWARE,
}
