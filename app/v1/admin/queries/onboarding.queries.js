import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const new_admin = async (data) => await prisma.admins.create({
    data: {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email_address,
        password: data?.password,
    }
});

export const update_admin = async (data, email) => await prisma.admins.update({
    where: { email },
    data,
});

export const update_email_verification = async (email, status = true) => await prisma.admins.update({ where: { email }, data: { isEmailVerified: status, updated_at: new Date() } });

export const update_email_password = async (email, password) => await prisma.admins.update({
        where: { email },
        data: { password, updated_at: new Date() }
    })

export const find_admin = async (email) => await prisma.admins.findFirst({ where: { email } })

export const save_token = async (token, email) => await prisma.tokens.create({
    data: {
        user: email,
        token,
    }
});

export const find_token = async (token) => await prisma.tokens.findFirstOrThrow({ where: { token } })
