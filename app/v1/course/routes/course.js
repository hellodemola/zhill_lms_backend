import { Router } from 'express';
import { ADD_ASSESSMENTS_CONTROLLER, ADD_COURSE_CONTROLLER, ADD_COURSE_TOPIC_CONTROLLER, ADD_LESSON_CONTROLLER, ADD_QUIZ_CONTROLLER, DELETE_LESSON_CONTROLLER, EDIT_LESSON_CONTROLLER, EDIT_QUIZ_CONTROLLER, ENABLE_COURSE_STATUS, FIND_LESSON_CONTROLLER, GET_COURSES_CONTROLLER, GET_COURSE_ID_CONTROLLER, GET_TOPICS_CONTROLLER, RESPONSE_CONTROLLER } from '../controller/course.controller.js';
import { IS_ASSESSMENTS_MIDDLEWARE, IS_COURSE_MIDDLEWARE, IS_COURSE_QUERY_MIDDLEWARE, IS_QUIZ_EXIT_MIDDLEWARE, IS_QUIZ_MIDDLEWARE, IS_TOPIC_MIDDLEWARE, VALIDATE_ADD_ASSESSMENT, VALIDATE_ADD_COURSE, VALIDATE_ADD_LESSION, VALIDATE_ADD_QUIZ, VALIDATE_ADD_TOPIC, VALIDATE_CHANGE_STATUS, VALIDATE_EDIT_LESSION, VALIDATE_EDIT_QUIZ, VALIDATE_GET_COURSES, VALIDATE_GET_SINGLE_COURSE, VALIDATE_GET_TOPICS } from '../middleware/course.middleware.js';
import { VALIDATE_LOGIN_USER } from '../../accounts/middlewares/validateToken.js';
import { IS_TUTOR_ACTIVE } from '../../admin/controller/onboarding.controller.js';
import { ACTIVITY_AUIT } from '../../accounts/middlewares/audits.js';
import { VALIDATE_EDIT_COURSE, VALIDATE_EDIT_TOPIC_COURSE } from '../middleware/update_course.middleware.js';
import { UPDATE_SINGLE_COURSE, UPDATE_SINGLE_TOPIC } from '../controller/update.course.controller.js';
import { ADD_CATEGORY_VALIDATION, UPDATE_CATEGORY_VALIDATION } from '../middleware/category.middleware.js';
import { ADD_CATEGORY_CONTROLLER, ADD_CATEGORY_TO_COURSE_CONTROLLER, FIND_CATEGORY_CONTROLLER, IS_CATEGORY_CONTROLLER, UPDATE_CATEGORY_CONTROLLER } from '../controller/categories.controller.js';

const router = Router();


/** GET ROUTERS */

router.get('/',
    VALIDATE_GET_COURSES,
    VALIDATE_LOGIN_USER,
    GET_COURSES_CONTROLLER
)

router.get('/course',
    VALIDATE_GET_SINGLE_COURSE,
    VALIDATE_LOGIN_USER,
    GET_COURSE_ID_CONTROLLER,
)

router.get('/topics',
    VALIDATE_GET_TOPICS,
    VALIDATE_LOGIN_USER,
    IS_COURSE_QUERY_MIDDLEWARE,
    GET_TOPICS_CONTROLLER,
)


/** PATCH ROUTES   */

router.patch('/:id',
    VALIDATE_EDIT_COURSE,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    UPDATE_SINGLE_COURSE,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
);

router.patch('/:id/topics/:topic_id',
    VALIDATE_EDIT_TOPIC_COURSE,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_TOPIC_MIDDLEWARE,
    UPDATE_SINGLE_TOPIC,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

// EDIT LESSON
router.patch('/:id/topic/:topic_id/lessons',
    VALIDATE_EDIT_LESSION,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    EDIT_LESSON_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

// EDIT LESSON TEST WIP
router.patch('/:id/topic/:topic_id/quiz',
    VALIDATE_EDIT_QUIZ,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_TOPIC_MIDDLEWARE,
    IS_QUIZ_EXIT_MIDDLEWARE,
    EDIT_QUIZ_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

// EDIT ASSESSMENT WIP
router.patch('/:id/assessments',
    VALIDATE_ADD_ASSESSMENT,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_ASSESSMENTS_MIDDLEWARE,
    ADD_ASSESSMENTS_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)



// DELETE LESSON
router.delete('/lessons/:id',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    FIND_LESSON_CONTROLLER,
    DELETE_LESSON_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)


/** POST ROUTERS */

router.post('/',
    VALIDATE_ADD_COURSE,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    ADD_COURSE_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

router.post('/:id/topic',
    VALIDATE_ADD_TOPIC,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    ADD_COURSE_TOPIC_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER
)

router.post('/:id/topic/:topic_id/lessons',
    VALIDATE_ADD_LESSION,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_TOPIC_MIDDLEWARE,
    ADD_LESSON_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

router.post('/:id/assessments',
    VALIDATE_ADD_ASSESSMENT,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_ASSESSMENTS_MIDDLEWARE,
    ADD_ASSESSMENTS_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

router.post('/:id/topic/:topic_id/quiz',
    VALIDATE_ADD_QUIZ,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    IS_TOPIC_MIDDLEWARE,
    IS_QUIZ_MIDDLEWARE,
    ADD_QUIZ_CONTROLLER,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)

router.post('/:id/status',
    VALIDATE_CHANGE_STATUS,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    IS_COURSE_MIDDLEWARE,
    ENABLE_COURSE_STATUS,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER
)

/* ADD CATEGORY */
router.post('/categories',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    ADD_CATEGORY_VALIDATION,
    ADD_CATEGORY_CONTROLLER,
)

router.get('/categories',
    FIND_CATEGORY_CONTROLLER
)

router.post('/categories/course',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    ADD_CATEGORY_TO_COURSE_CONTROLLER,
)

router.patch('/categories/:id',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    UPDATE_CATEGORY_VALIDATION,
    IS_CATEGORY_CONTROLLER,
    UPDATE_CATEGORY_CONTROLLER,

)



export default router;
