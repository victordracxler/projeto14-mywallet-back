import { signIn, signUp } from '../controllers/authController.js';

import { Router } from 'express';
import {
	signInValidation,
	signUpValidation,
} from '../middlewares/schemaValidationMiddleware.js';

const router = Router();

router.post('/signup', signUpValidation, signUp);

router.post('/signin', signInValidation, signIn);

export default router;
