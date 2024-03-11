import { Router } from 'express';
import { EMAIL_VERIFICATION_CONTROLLER, FORGET_PASSWORD_CONTROLLER, REGISTER_CONTROLLER, SEND_EMAIL_VERIFICATION_CONTROLLER, SEND_FORGET_PASSWORD_CONTROLLER } from '../controller/onboarding.controller.js';
import { VALIDATE_FORGET_PASSWORD, VALIDATE_REGISTER, VALIDATE_SEND_EMAIL_VERIFICATION, VALIDATE_UPDATE_PASSWORD, VALIDATE_VERIFY_EMAIL_VERIFICATION } from '../middleware/onboarding.middleware.js';
const router = Router();

router.post('/register',
    VALIDATE_REGISTER,
    REGISTER_CONTROLLER
);

router.post('/verifications/email/send',
    VALIDATE_SEND_EMAIL_VERIFICATION,
    SEND_EMAIL_VERIFICATION_CONTROLLER,
);

router.post('/verifications/email/code',
    VALIDATE_VERIFY_EMAIL_VERIFICATION,
    EMAIL_VERIFICATION_CONTROLLER,
)

router.post('/verifications/forget-password/reset',
    VALIDATE_FORGET_PASSWORD,
    SEND_FORGET_PASSWORD_CONTROLLER,
)

router.patch('/register',
    VALIDATE_UPDATE_PASSWORD,
    FORGET_PASSWORD_CONTROLLER,
)

export default router;
