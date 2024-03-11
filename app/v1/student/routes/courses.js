import { Router } from 'express';
import { INTIALIZE_PAYSTACK_PAYMENT, LEARNING_CONTROLLER, MY_COURSES_CONTROLLER, PAYSTACK_HOOK_SETUP, SAVE_PAYEMENT_REF, SEARCH_CONTROLLER, VERIFY_PAYSTACK_PAYMENT } from '../controller/learning/courses.js';
import { CHECK_USER, VALIDATE_LOGIN_USER } from '../../accounts/middlewares/validateToken.js';
import { FREE_COURSE_SUBSCRIPTION_CONTROLLER, IS_COURSE_ACTIVE_CONTROLLER, VALIDATE_INTIALIZE_PAYSTACK_PAYMENT, VALIDATE_SINGLE_COURSE_STUDENT, VALIDATE_VERIFY_PAYSTACK_PAYMENT, VALIDATE_WATCH } from '../middleware/payments/payments.middleware.js';
import { RESPONSE_CONTROLLER } from '../../course/controller/course.controller.js';
import { COURSE_CURRENT_WATCH, IS_CONTENT_CONTROLLER, IS_COURSE_CONTROLLER, IS_STUDENT_SUBSCRIBED, SINGLE_CATEGORIES_COURSES, SINGLE_COURSE_USER_CONTROLLER } from '../controller/learning/singleCourse.js';
import { CALCULATE_CANDIDATE_SCORE_CONTROLLER, CANDIDATE_CREATE_CERTIFICATE, IS_ASSESSMENT_MIDDLEWARE, IS_STUDENT_SUBSCRIBED_CONTROLLER, STUDENT_INFO_MIDDLEWARE, VALIDATE_QUIZ_MIDDLEWARE } from '../controller/learning/quiz.js';
const router = Router();

router.get("/",
    LEARNING_CONTROLLER
);

router.get('/search',
    SEARCH_CONTROLLER,
);

router.get('/course/:id',
    CHECK_USER,
    VALIDATE_SINGLE_COURSE_STUDENT,
    SINGLE_COURSE_USER_CONTROLLER,
)

router.get('/category/:id',
    VALIDATE_SINGLE_COURSE_STUDENT,
    SINGLE_CATEGORIES_COURSES,
)

router.get('/courses',
    VALIDATE_LOGIN_USER,
    MY_COURSES_CONTROLLER,
)

router.post('/payments',
    VALIDATE_LOGIN_USER,
    VALIDATE_INTIALIZE_PAYSTACK_PAYMENT,
    IS_COURSE_ACTIVE_CONTROLLER,
    FREE_COURSE_SUBSCRIPTION_CONTROLLER,
    INTIALIZE_PAYSTACK_PAYMENT,
    SAVE_PAYEMENT_REF,
    RESPONSE_CONTROLLER,
)

router.patch('/payments',
    VALIDATE_VERIFY_PAYSTACK_PAYMENT,
    VALIDATE_LOGIN_USER,
    VERIFY_PAYSTACK_PAYMENT,
)

// WEBHOOKS TO WATCH FOR PAYMENT
router.post('/payments/webhook',
    PAYSTACK_HOOK_SETUP
);

router.put('/progress/:course_id',
    VALIDATE_LOGIN_USER,
    VALIDATE_WATCH,
    IS_COURSE_CONTROLLER,
    IS_CONTENT_CONTROLLER,
    IS_STUDENT_SUBSCRIBED,
    COURSE_CURRENT_WATCH,
)

router.patch('/quiz/:id',
    VALIDATE_LOGIN_USER,
    VALIDATE_QUIZ_MIDDLEWARE,
    STUDENT_INFO_MIDDLEWARE,
    IS_STUDENT_SUBSCRIBED_CONTROLLER,
    IS_ASSESSMENT_MIDDLEWARE,
    CALCULATE_CANDIDATE_SCORE_CONTROLLER,
    CANDIDATE_CREATE_CERTIFICATE,
)



export default router;
