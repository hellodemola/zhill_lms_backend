import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const get_latest_courses = async (take = 10) => await prisma.courses.findMany({
    where: { status: 'active' },
    orderBy: { created_at: 'desc' },
    select: {
        id: true,
        name: true,
        status: true,
        course_topics: {
            select: { introduction_video: true }
        },
        description: true,
        certification: true,
        img_url: true,
        course_topics: { select: { id: true, introduction_video: true } },
        prices: {
            select: { amount: true, currencies: true }
        },
        created_at: true,
        updated_at: true,
    },
    take
});

const search_course = async (search) => {
    const item = search.replace(/[\s\n\t]/g, '_')
    console.log({ item })
    const result = await prisma.courses.findMany({
        where: {
            status: 'active',
            name: {
                search: item,
            }
        }
    });

    return result;
}

const find_subscription = async (student_id, course_id) => prisma.subscriptions.findFirst({
    where: { course_id, student_id }
});

const find_subscription_by_studentId = async (student_id) => prisma.subscriptions.findMany(
    {
        where: { student_id },
        select: {
            courses: {
                select: {
                    id: true,
                    img_url: true,
                    name: true,
                    description: true,
                    benefits: true,
                    course_topics: true,
                    certification: true,
                    img_url: true,
                    created_at: true,
                }
            },
            status: true,
            amount: true,
            isComplete: true,
            created_at: true,
        }
    })

export const find_subscription_by_ref = async (ref) => prisma.subscriptions.findFirst({
    where: { payment_ref: ref }
});

const add_free_subscription = async (student_id, course_id) => await prisma.subscriptions.create({
    data: {
        course_id,
        student_id,
        status: 'active',
        amount: 0,
        currency_id: 1,
    }
});

const add_subscription = async (payment_ref, student_id, course_id, amount) => await prisma.subscriptions.create({
    data: {
        course_id,
        student_id,
        payment_ref,
        amount,
        status: 'pending',
        currency_id: 1
    }
});

const update_subscription_completion = async (id) => await prisma.subscriptions.update({
    where: { id },
    data: {
        isComplete: true,
    }
});

const update_subscription_status = async (payment_ref, id, amount) => await prisma.subscriptions.update({
    where: { id },
    data: { payment_ref, amount, currency_id: 1 }
})

export const change_subscription_status = async (reference, status) => await prisma.subscriptions.update({
    where: { payment_ref: reference },
    data: { status }
})

const is_course_active_query = async (course_id) => await prisma.courses.findFirst({
    where: {
        id: course_id,
        status: 'active'
    }
});

export const course_price_query = async (course_id) => await prisma.prices.findFirst({
    where: { course_id }
})

const is_student_subscribed_query = async (course_id, student_id) => prisma.subscriptions.findFirst({
    where: {
        course_id,
        student_id,
        status: 'active'
    }

})


export {
    get_latest_courses,
    is_course_active_query,
    is_student_subscribed_query,
    add_subscription,
    update_subscription_status,
    find_subscription,
    find_subscription_by_studentId,
    update_subscription_completion,
    add_free_subscription,
    search_course,
}
