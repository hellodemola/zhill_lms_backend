import Joi from "joi";

export const AddCourseSchema = (request) => {

    const schema = Joi.object({
        course_name: Joi.string().min(3).required(),
        course_description: Joi.string().min(3).required("Description is required"),
        course_benefits: Joi.string().min(3).required(),
        course_image_url: Joi.string().uri().required(),
        amount: Joi.number().required(),
        currency_id: Joi.number().required(),
    })

    const { error } = schema.validate(request);
    if (error) return { message: error.details[0].message }
    return null;

}

export const AddTopicSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().min(3).required("Topic name is required"),
        introduction_video: Joi.string().uri(),
        topic_number: Joi.number().required(),
    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null;
}

export const AddLessonSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        topic_id: Joi.number().required(),
        content: Joi.array().items(Joi.object({
            title: Joi.string().min(3).required(),
            content_url: Joi.string().uri().required(),
            content_type: Joi.string().required(),
            duration: Joi.when('content_type', { is: "pdf", then: Joi.forbidden("PDF does not have a duration"), otherwise: Joi.string().required() }),
        }))
    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}

export const EditLessonSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        title: Joi.string().min(3).required(),
        content_url: Joi.string().uri().required(),
        content_type: Joi.string().required(),
        duration: Joi.when('content_type', { is: "pdf", then: Joi.forbidden("PDF does not have a duration"), otherwise: Joi.string().required() }),
        })


    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}

export const AddAssessmentSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        pass_mark_percentage: Joi.number().required(),
        instruction: Joi.string(),
        questions: Joi.array().items(Joi.object({
            number: Joi.number().required(),
            question: Joi.string().required(),
            options: Joi.object({
                option_1: Joi.string().min(3).required(),
                option_2: Joi.string().min(3).required(),
                option_3: Joi.string().min(3),
                option_4: Joi.string().min(3),
            }),
            correct_answer: Joi.string().valid('option_1', 'option_2', 'option_3', 'option_4').required("A correct answer is required"),
            mark: Joi.number()
        }))
    })
    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null
}

export const AddQuizSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        topic_id: Joi.number().required(),
        pass_mark_percentage: Joi.number().required(),
        instruction: Joi.string(),
        questions: Joi.array().items(Joi.object({
            number: Joi.number().required(),
            question: Joi.string().required(),
            options: Joi.object({
                option_1: Joi.string().min(3).required(),
                option_2: Joi.string().min(3).required(),
                option_3: Joi.string().min(3),
                option_4: Joi.string().min(3),
            }),
            correct_answer: Joi.string().valid('option_1', 'option_2', 'option_3', 'option_4').required("A correct answer is required"),
            mark: Joi.number()
        }))
    })
    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null
}

export const EditQuizSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        topic_id: Joi.number().required(),
        pass_mark_percentage: Joi.number(),
        instruction: Joi.string(),
        questions: Joi.array().items(Joi.object({
            number: Joi.number(),
            question: Joi.string(),
            options: Joi.object({
                option_1: Joi.string().min(3),
                option_2: Joi.string().min(3),
                option_3: Joi.string().min(3),
                option_4: Joi.string().min(3),
            }),
            correct_answer: Joi.string().valid('option_1', 'option_2', 'option_3', 'option_4'),
            mark: Joi.number()
        }))
    })
    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null
}

export const GetTopicsSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        topic_id: Joi.number().required(),
        page: Joi.number(),
        limit: Joi.number(),

    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}

export const GetCoursesSchema = (data) => {
    const schema = Joi.object({
        page: Joi.number(),
        limit: Joi.number(),

    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}

export const GetSingleCourseSchema = (data) => {
    const schema = Joi.object({
        page: Joi.number(),
        limit: Joi.number(),
        id: Joi.number().required(),

    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null

}


export const ChangeCourseStatusSchema = (data) => {
    const schema = Joi.object({
        id: Joi.number().required(),
        status: Joi.valid("active", "disable").required(),
    })

    const { error } = schema.validate(data);
    if (error) return { message: error.details[0].message }
    return null
}
