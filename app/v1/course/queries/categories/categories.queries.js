import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const add_category = async(category_details) => {
    return await prisma.categories.create({
      data: category_details
  })
}

export const find_single_category_by_id = async (category_id) => await prisma.categories.findFirst({
    where: {
        id: category_id
    }
});

export const update_single_category = async (category_id, category_details) => await prisma.categories.update({
    where: { id: category_id },
    data: category_details,
});

export const find_single_category_by_name = async (name) => await prisma.categories.findFirst({
    where: {
        name
    }
})

export const find_all_categories = async () => await prisma.categories.findMany();

export const update_category = async (category_id, updated_details) => {
    return await prisma.categories.update({
        where: { id: category_id },
        data: updated_details
    })
}

export const delete_category_by_id = async (category_id) => await prisma.categories.delete({
    where: { id: category_id }
})

export const find_course_cat = async (course_id, category_id) => {
    return await prisma.course_categories.findFirst({
        where: {
            course_id,
            category_id,
        }
    })
}

export const add_catory_cat = async (course_id, category_id) => {
    return await prisma.course_categories.create({
        data: {
            course_id,
            category_id,
        }
    })
}
