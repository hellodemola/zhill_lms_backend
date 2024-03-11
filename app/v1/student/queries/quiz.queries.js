import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const get_quiz_by_id = async (question_id) => await prisma.questions.findUnique({
    where: { id: question_id },
    include: { assessments: true }
});

const get_assessment_by_id = async (assessment_id) => await prisma.assessments.findUnique({
    where: { id: assessment_id },
    include: {
        questions: true
    }
});

const find_quiz_result = async (assessment_id, student_id) => {
    const response = await prisma.results.findFirst({
    where: { assessment_id, student_id }
    });

    console.log({ assessment_id, student_id, response })


    return response
}

const update_quiz_result = async (
    result_id,
    score,
    status
) => await prisma.results.update({
        where: { id: result_id },
        data: { score, status }
})

const record_quiz_result = async (
    assessment_id,
    student_id,
    score,
    record_status
) => await prisma.results.create({
    data: {
        assessment_id,
        student_id,
        score,
        status: record_status,
    }
});


export {
    get_quiz_by_id,
    find_quiz_result,
    record_quiz_result,
    update_quiz_result,
    get_assessment_by_id
}
