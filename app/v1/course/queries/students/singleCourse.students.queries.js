import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const find_single_course_by_id = async (
    id,
    subscription_id = 0,
    student_id,
) => await prisma.courses.findFirst({
    where: { id },
    select: {
        name: true,
        description: true,
        img_url: true,
        benefits: true,
        created_at: true,
        status: true,
        prices: { select: { amount: true, currencies: true, id: true } },
         course_topics: {
            select: {
                id: true,
                topic_no: true,
                title: true,
                introduction_video: true,
                created_at: true,
                updated_at: true,
                 course_topic_contents: {
                     select: {
                         id: true,
                         course_topic_id: true,
                         title: true,
                         content_url: true,
                         created_at: true,
                         updated_at: true,
                         content_type: true,
                         duration: true,
                         course_current_watch: {
                             where: {
                                 subscription_id,
                             },
                             select: {
                                 current_watch: true,
                             }
                         }
                    }
                },
                 assessments: {
            select: {
                id: true,
                instruction: true,
                pass_mark_percentage: true,
                topic_id: true,
                questions: true,
                results: {
                    where: {
                        student_id,
                  }
                }
            }
         },
        } },
        assessments: {
            select: {
                id: true,
                instruction: true,
                pass_mark_percentage: true,
                topic_id: true,
                results: {
                    where: {
                        student_id
                    }
                },
                questions: {
                    select: {
                        id: true,
                        number: true,
                        assessment_id: true,
                        question: true,
                        mark: true,
                        option_1: true,
                        option_2: true,
                        option_3: true,
                        option_4: true,
                    }
                }
            }
         },
        subscriptions: {
           select: { id: true }
        },
        course_categories: true,

    }
})

export const find_overview_course = async (course_id) => await prisma.courses.findFirst({
    where: {
        id: course_id,
    },
    select: {
        name: true,
        status: true,
        description: true,
        benefits: true,
        created_at: true,
        prices: { select: { amount: true, currencies: true, id: true } },
        subscriptions: {
            select: { id: true }
        },
        course_categories: true,
        course_topics: {
            select: {
                id: true,
                topic_no: true,
                title: true,
                introduction_video: true,
                created_at: true,
                updated_at: true,
            }
        }
    }
});

export const category_course = async (category_id) => await prisma.course_categories.findMany({
    where: { category_id, courses: { status: 'active' } },
    select: {
        courses: true,
    }
})


export const create_current_watch = async(
    course_id,
    topic_id,
    student_id,
    lesson_id,
    current_watch,
    subscription_id,
) => await prisma.course_current_watch.create({
    data: {
        course_id,
        topic_id,
        student_id,
        lesson_id,
        current_watch,
        subscription_id,
    }
})

export const update_current_watch = async (
    watch_id,
    current_watch,
) => await prisma.course_current_watch.update({
    where: { id: watch_id },
    data: {
        current_watch
    }
});



export const find_current_watch = async (subscription_id, lesson_id) => await prisma.course_current_watch.findFirst({
    where: {
        lesson_id,
        subscription_id,
    }
});
