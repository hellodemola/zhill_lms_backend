import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const edit_courses = async (COURSE_ID, data) => {
    return await prisma.courses.update({
        where: { id: COURSE_ID },
        data,
    })

}

export const edit_courses_topic = async (TOPIC_ID, data) => {
    return await prisma.course_topics.update({
        where: {
            id: TOPIC_ID,
        },
        data,
    })

}

export const update_quiz = async (course_id, topic_id, data) => {
    return await prisma.assessments.update({
        where: {
            course_id: Number(course_id),
            topic_id: Number(topic_id),
        },
        data,
    })
};

export const delete_lesson = async (lesson_id) => {
    return await prisma.course_topic_contents.delete({
        where: { id: lesson_id }
    })
}

export const find_lesson_id = async (lesson_id) => {
   const findRecord = await prisma.course_topic_contents.findFirst({
        where: { id: lesson_id }
   })
    if (!findRecord) return false;
    return findRecord;
}
