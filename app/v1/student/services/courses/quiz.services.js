import { calculateScore } from "../../../../../utils/calculateScore.js";
import { find_subscription, find_subscription_by_ref, is_student_subscribed_query, update_subscription_completion } from "../../../course/queries/students/courses.students.queries.pq.js";
import { find_student } from "../../queries/onboarding.queries.js";
import { find_quiz_result, get_assessment_by_id, record_quiz_result, update_quiz_result } from "../../queries/quiz.queries.js"

const is_percentage_pass = (score, total, pass_percentage) => {
    let sum = total?.length > 1
        ? total?.reduce((prev, num) => prev + num.mark, 0)
        : total[0].mark;

    if (
        !score
        || !pass_percentage) return false;

    const candidate_pass_percentage = (score/sum) * 100;

    console.log({candidate_pass_percentage})

    const isPass = candidate_pass_percentage >= pass_percentage
    return isPass;
}


const CALCULATE_CANDIDATE_SCORE_SERVICE = async (
    CANDIDATE_ANSWERS = [],
    quiz,
    STUDENT_ID
) => {
    let isPass;
    const candidate_score = calculateScore(
        CANDIDATE_ANSWERS,
        quiz,
    );

    if (is_percentage_pass(
        candidate_score,
        quiz.questions,
        quiz.pass_mark_percentage
    )) {
        isPass = true
    } else {
        isPass = false
    };

    const data = { data: { isPass, candidate_score, quiz }, isError: false };

    const find_result = await find_quiz_result(quiz?.id, STUDENT_ID);

    if (find_result?.status === 'passed') {
        console.log({find_result})
        const resp = {
        isError: true,
        error_message: "You have passed this quiz already",
            code: 400
        }
        return resp
    }

    if (find_result) {
        await update_quiz_result(
            find_result.id,
            candidate_score,
            isPass ? "passed" : "failed"
        );

    } else {

        await record_quiz_result(
            quiz.id,
            STUDENT_ID,
            candidate_score,
            isPass ? "passed" : "failed"
        );
    }
    return data

};

const IS_QUIZ_SERVICE = async (ASSESSMENT_ID) => {
  const quiz = await get_assessment_by_id(ASSESSMENT_ID);
    if (!quiz) return {
        isError: true,
        error_message: "Quiz is not found",
        code: 404
    };
    return quiz;
}

const IS_STUDENT_SUBSCRIBED_SERVICES = async (STUDENT_ID, COURSE_ID) => {
    const is_sub = await is_student_subscribed_query(COURSE_ID, STUDENT_ID);
    if (is_sub) return is_sub;
    return null;
}

const GET_STUDENT_ID_SERVICE = async (email) => {
    const student = await find_student(email);
    if (student) return student.id;
    return null
}

const UPDATE_SUBSCRIPTION_SERVICE = async (SUB_ID) => await update_subscription_completion(SUB_ID);

export {
    CALCULATE_CANDIDATE_SCORE_SERVICE,
    GET_STUDENT_ID_SERVICE,
    IS_QUIZ_SERVICE,
    IS_STUDENT_SUBSCRIBED_SERVICES,
    UPDATE_SUBSCRIPTION_SERVICE
}
