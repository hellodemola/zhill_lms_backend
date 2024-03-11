import { Router } from 'express';
import { VALIDATE_ADD_CURRENCY } from '../middleware/currency.middleware.js';
import { VALIDATE_LOGIN_USER } from '../../../accounts/middlewares/validateToken.js';
import { IS_TUTOR_ACTIVE } from '../../../admin/controller/onboarding.controller.js';
import { ACTIVITY_AUIT } from '../../../accounts/middlewares/audits.js';
import { RESPONSE_CONTROLLER } from '../../../course/controller/course.controller.js';
import { ADD_CURRENCY, GET_ALL_CURRENCY } from '../controller/index.js';

const router = Router();

router.get("/",
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    GET_ALL_CURRENCY
)

router.post("/",
    VALIDATE_ADD_CURRENCY,
    VALIDATE_LOGIN_USER,
    IS_TUTOR_ACTIVE,
    ADD_CURRENCY,
    ACTIVITY_AUIT,
    RESPONSE_CONTROLLER,
)


export default router;
