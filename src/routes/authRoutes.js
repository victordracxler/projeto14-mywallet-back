import { signUp } from '../controllers/authController.js';

import { Router } from 'express';
import { signUpValidation } from '../middlewares/schemaValidation.js';

const router = Router();

router.post('/signup', signUpValidation, signUp);

export default router;
