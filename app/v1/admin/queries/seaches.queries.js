import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const search_admin_courses = async (search) => {
    const item = search.replace(/[\s\n\t]/g, '_')
    console.log({ item })
    const result = await prisma.courses.findMany({
        where: {
            name: {
                search: item,
            }
        },
        select: {
            id: true,
            name: true,
            description: true,
        }
    });

    return result;
};

const search_admin_students = async (search) => {
    const names = search.replace(/[\s\n\t]/g, '_');
    const result = await prisma.students.findMany({
        where: {
            first_name: { search: names },
            last_name: { search: names },
            email: { search: names }
        },
        select: {
            first_name: true,
            last_name: true,
            id: true,
            email: true,
        }
    });

    return result;
};

const find_admin_single_student = async (id) => prisma.students.findUnique({
    where: { id },
    select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        created_at: true,
        isEmailVerified: true,
        results: true,
        subscriptions: true,
    }
});

const find_admin_single_course = async (id) => prisma.courses.findUnique({
    where: { id },
    include: {
        assessments: true,
        course_topics: true,
        subscriptions: true,
        course_categories: true,
        prices: true,
    }
})


export {
    search_admin_courses,
    search_admin_students,
    find_admin_single_student,
    find_admin_single_course
}
