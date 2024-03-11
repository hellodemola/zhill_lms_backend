import { Router } from 'express';

import { VALIDATE_CHANGE_PASSWORD, VALIDATE_FORGET_PASSWORD, VALIDATE_LOGIN } from '../middleware/onboarding.middleware.js';
import { CHANGE_PASSWORD_CONTROLLER, LOGIN_CONTROLLER, _IS_ADMIN } from '../controller/onboarding.controller.js';
import { VALIDATE_LOGIN_USER } from '../../accounts/middlewares/validateToken.js';
const router = Router();

router.post('/login',
    VALIDATE_LOGIN,
    _IS_ADMIN,
    LOGIN_CONTROLLER

);

router.patch('/change-password',
    VALIDATE_LOGIN_USER,
    VALIDATE_CHANGE_PASSWORD,
    CHANGE_PASSWORD_CONTROLLER,
)

export default router;
