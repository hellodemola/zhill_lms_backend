import { Router } from 'express';

import { VALIDATE_LOGIN } from '../middleware/onboarding.middleware.js';
import { LOGIN_CONTROLLER } from '../controller/onboarding.controller.js';
const router = Router();

router.post('/login',
    VALIDATE_LOGIN,
    LOGIN_CONTROLLER

);

export default router;
