export const is_course_helper = (state) => {

    switch (state) {
        case "NOT_FOUND":
            return { error_code: 404, error_message: "This course is not avaliable" };
        case "NOT_ACTIVE":
            return { error_message: `course is not active`, error_code: 400 }
        case "WRONG_PRICE":
            return {
                error_message: `Price is not correct, the right price is correct`, error_code: 400
            }
        case "ALREADY_SUB":
            return {
                error_message: "Student is already subscribed for this course", error_code: 400
            }

        default:
            return {

            error_message : null
            }
    }
}
