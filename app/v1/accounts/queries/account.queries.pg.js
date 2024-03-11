import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const add_log_queries = async (data) => {
    const { activity, tutorId } = data
    try {
        return await prisma.activity_logs.create({
            data: {
                activity,
                admin_id: tutorId
            }
        })
    } catch (error) {
        console.error({ error })
        throw new Error(error) 
    }
}
