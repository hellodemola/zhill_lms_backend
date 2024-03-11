import { Router } from 'express';
import { VALIDATE_LOGIN_USER } from '../../accounts/middlewares/validateToken.js';
import { IS_TUTOR_ACTIVE } from '../controller/onboarding.controller.js';
import { DASHBOARD_CONTROLLER, DASHBOARD_COURSES_CONTROLLER, DASHBOARD_STUDENTS_CONTROLLER } from '../controller/dashboard.controller.js';
import { VALIDATE_GET_DASHBOARD } from '../middleware/dashboard.middleware.js';
import { FIND_COURSE_CONTROLLER, FIND_STUDENT_CONTROLLER, SEARCH_COURSES_CONTROLLER, SEARCH_STUDENTS_CONTROLLER } from '../controller/courses.controller.js';
const router = Router();

router.get('/',
    VALIDATE_GET_DASHBOARD,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    DASHBOARD_CONTROLLER
)

router.get('/courses',
    VALIDATE_GET_DASHBOARD,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    DASHBOARD_COURSES_CONTROLLER
)

router.get('/courses/search',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    SEARCH_COURSES_CONTROLLER,
);

router.get('/course/:id',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    FIND_COURSE_CONTROLLER
);


router.get('/students',
    VALIDATE_GET_DASHBOARD,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    DASHBOARD_STUDENTS_CONTROLLER,
)

router.get('/student/:id',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    FIND_STUDENT_CONTROLLER,
);

router.get('/students/search',
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    SEARCH_STUDENTS_CONTROLLER,
);



export default router;
