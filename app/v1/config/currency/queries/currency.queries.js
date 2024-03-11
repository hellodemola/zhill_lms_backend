import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const find_currency = async (id) => prisma.currencies.findFirst({
    where: { id }
});

export const find_all_currency = async () => await prisma.currencies.findMany();

export const create_currency = async (currency) => {
    const { id, name, symbol, short_code } = currency;
    const num_id = Number(id);
    return prisma.currencies.create({
        data: {
            id: num_id,
            name,
            symbol,
            short_code
        }
    })
};
