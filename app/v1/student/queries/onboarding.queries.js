import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const new_student = async (data) => await prisma.students.create({
    data: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email_address,
        password: data?.password,
    }
});

export const update_email_verification = async (email, status = true) => await prisma.students.update({ where: { email }, data: { isEmailVerified: status, updated_at: new Date() } });

export const update_email_password = async (email, password) => await prisma.students.update({
        where: { email },
        data: { password, updated_at: new Date() }
    })

export const find_student = async (email) => await prisma.students.findUnique({
    where: { email },
    select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        phone_number: true,
        profile_url: true,
        password: true,
    }
});


export const get_all_students = async (
    limit = 10,
    page = 0,
) => {

    return await prisma.students.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            phone_number: true,
            isEmailVerified: true,
            created_at: true,
        },
        orderBy: {
            created_at: 'desc'
        },
        take: limit,
        skip: page,
    })

}

export const get_all_by_date_students = async (
    date_range,
    limit = 10,
    page = 0,
) => {
    const { start_date, end_date } = date_range

    console.log({end_date, date_range})

    return await prisma.students.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            isEmailVerified: true,
            created_at: true,
        },
        orderBy: {
            created_at: 'desc'
        },
        where: {
            created_at: {
                lte: end_date,
                gte: start_date
            }
        },
        take: limit,
        skip: page,
    })

}

export const get_all_by_date_students_counts = async (
    date_range,
) => {
    const { start_date, end_date } = date_range

    return await prisma.students.count({
        where: {
            created_at: {
                lte: end_date,
                gte: start_date
            }
        }
    })

}

export const get_all_by_date_validated_students_counts = async (
    date_range,
) => {
    const { start_date, end_date } = date_range

    return await prisma.students.count({
        where: {
            isEmailVerified: true,
            created_at: {
                lte: end_date,
                gte: start_date
            }
        }
    })

}

export const get_all_by_date_unvalidated_students_counts = async (
    date_range,
) => {
    const { start_date, end_date } = date_range

    return await prisma.students.count({
        where: {
            isEmailVerified: false,
            created_at: {
                lte: end_date,
                gte: start_date
            }
        }
    })

}



export const save_token = async (token, email) => await prisma.tokens.create({
    data: {
        user: email,
        token,
    }
});

export const find_token = async (token) => await prisma.tokens.findFirstOrThrow({ where: { token } })
