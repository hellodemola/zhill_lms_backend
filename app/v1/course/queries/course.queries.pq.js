import { PrismaClient } from "@prisma/client";
import { handleError } from "../../../../utils/helper.js";

const prisma = new PrismaClient();

export const add_course = async (data) => {
    const {
        course_name: name,
        course_description: description,
        course_benefits: benefits,
        status,
        user: tutor_id,
        course_image_url: img_url,
    } = data
    return await prisma.courses.create({
        data: {
            name,
            description,
            benefits,
            tutor_id: tutor_id,
            certification: true,
            status,
            img_url,
        }
    });
};

export const add_topic = async (data) => {
    const {title, topic_number, course_id, introduction_video = "" } = data
    try {
        console.log({ introduction_video })
        return await prisma.course_topics.create({
            data: {
                title,
                topic_no: topic_number,
                course_id,
                introduction_video,
            }
        })
    } catch (error) {
        handleError(error)
    }
}

export const add_assessments = async (data) => {
    const {
        course_id,
        pass_mark_percentage,
        instruction,
    } = data
   return await prisma.assessments.create({
        data: {
            course_id,
            pass_mark_percentage,
            instruction,
        }
    })
}

export const add_quiz = async (data) => {
    console.log({quiz: data})
    const {
        course_id,
        topic_id,
        pass_mark_percentage,
        instruction,
    } = data
   return await prisma.assessments.create({
        data: {
           course_id: Number(course_id),
            topic_id: Number(topic_id),
            pass_mark_percentage,
            instruction,
        }
    })
}

export const find_single_assessment = async (course_id) => {
    const id = Number(course_id);
    const found = await prisma.assessments.findFirst({
        where: {
            course_id: id,
            topic_id: null,
        }
    });
    return found;
}

export const find_assessments = async (course_id) => {
    const id = Number(course_id)
    try {
        const search = await prisma.assessments.findFirst({
            where: { course_id: id }
        })
        return search;
    } catch (error) {
        handleError(error)
    }
}

export const find_quiz = async (course_id, topic_id) => {
    const id = Number(course_id)
    const topicId = Number(topic_id)
    console.log({id, topicId})
    try {
        const search = await prisma.assessments.findFirst({
            where: { course_id: id, topic_id: topicId }
        })
        return search;
    } catch (error) {
        handleError(error)
    }
}

export const add_questions = async (data, assessment_id) => {
    try {
        const question =  await prisma.questions.createMany({
        data: data?.questions.map((each) => {
            const {
                number,
                question,
                correct_answer,
                mark,
                options,
            } = each;
            return ({
                number,
                assessment_id,
                question,
                correct_answer,
                mark,
                option_1: options?.option_1,
                option_2: options?.option_2,
                option_3: options?.option_3,
                option_4: options?.option_4,
            })
        }),
        skipDuplicates: true,
        })
        return question;
    } catch (error) {
        handleError(error)
    }

}


export const find_course_by_name = async (course_name) => await prisma.courses.findFirst({
    where: { name: course_name }
});

export const find_courses = async (SKIPS = 0, limit = 10) => await prisma.courses.findMany({
    select: {
        name: true,
        description: true,
        status: true,
        img_url: true,
        created_at: true,
        id: true,
    },
    orderBy: {
        created_at: 'desc'
    },
    take: limit,
    skip: SKIPS

});

export const find_all_topics = async (SKIPS = 0, LIMITS = 10, COURSE_ID, TOPIC_ID) => await prisma.course_topics.findMany({
    where: {
        course_id: Number(COURSE_ID),
        id: Number(TOPIC_ID),
    },
    select: {
        course_id: true,
        title: true,
        topic_no: true,
        course_topic_contents: {
            select: {
                title: true,
                content_url: true,
                content_type: true,
                duration: true,
                created_at: true,
                updated_at: true,
                id: true,
            }
        },
        assessments: {
            select: {
                id: true,
                instruction: true,
                pass_mark_percentage: true
            }
        }
    },
    orderBy: { topic_no: 'asc' },
    take: LIMITS,
    skip: SKIPS,

});

export const find_total_topics = async (COURSE_ID, TOPIC_ID) => await prisma.course_topics.count({
    where: {
        id: Number(TOPIC_ID),
        course_id: Number(COURSE_ID),
    }
});

export const find_total_course = async () => await prisma.courses.count();
export const get_all_by_date_courses_counts = async (
    date_range,
) => {
    const { start_date, end_date } = date_range

    return await prisma.courses.count({
        where: {
            created_at: {
                lte: end_date,
                gte: start_date
            }
        }
    })

}

export const get_subscription_date = async (date_range) => {
    const { start_date, end_date } = date_range;
    const item = await prisma.subscriptions.aggregate({
        where: {
            created_at: {
                lte: end_date,
                gte: start_date
            }
        },
        _sum: { amount: true },
        _count: { isComplete: true, id: true },
    })

    return item
};



export const get_all_by_date_courses = async (
    date_range,
    limit = 10,
    page = 0,
) => {
    const { start_date, end_date } = date_range

    return await prisma.courses.findMany({
        select: {
        id: true,
        prices: true,
        name: true,
        description: true,
        status: true,
        img_url: true,
        subscriptions: true,
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


export const find_topic = async (course_id, topic_id) => await prisma.course_topics.findUnique({
    where: { id: topic_id }
});

export const find_topic_by_name = async (topic_name) => await prisma.course_topics.findFirst({
    where: {
        title: topic_name
    }
});

export const find_topic_by_number = async (
    topic_no,
    course_id,
) => await prisma.course_topics.findFirst({
    where: { topic_no, course_id }
});

export const find_course = async (course_id) => await prisma.courses.findUnique({
    where: {
        id: course_id,
    },
    include: {
        assessments: true,
        course_topics: {
            include: {
                course_topic_contents: true,
                assessments: true,
            }
        },
        prices: true,
        subscriptions: true,
    }
});


export const add_course_topic = async (data) => {
    const {
        title,
        topic_number: topic_no,
    } = data;

    return await prisma.course_topics.create({
        data: {
            title,
            topic_no,
        }
    })
}

export const add_topic_contents = async (data, topic_id) => {
    console.log({data: data?.content, topic_id})
    try {
  return await prisma.course_topic_contents.createMany({
    data: data?.content.map((each) => {
        const {
            title,
            content_url,
            content_type,
            duration,
        } = each;
        return ({
            title,
            content_url,
            content_type,
            duration: duration || null,
            course_topic_id: Number(topic_id)
        })
    }),
    skipDuplicates: true,
});

    } catch (error) {
        handleError(error)
    }
}

export const create_assessments = async (data) => await prisma.assessments.create(data);


export const create_options = async (data) => await prisma.options.createMany({
    data
})

export const find_price = async (currency_id, course_id) => {
    return await prisma.prices.findFirst({
        where: {
            currencies: currency_id,
            course_id: course_id,
        }
    })
};


export const add_price = async (data) => {
    const {
        course_id,
        amount,
        currency_id,
    } = data

    return await prisma.prices.create({
        data: {
            course_id,
            amount,
            currencies: currency_id,
        }
    })
}


//
export const edit_lesson = async (data, lesson_id) => {
    return await prisma.course_topic_contents.update({
        where: { id: lesson_id },
        data
    })
}

export const find_lesson = async (lesson_id) => {
    return await prisma.course_topic_contents.findFirst({
        where: { id: lesson_id  }
    })
}
