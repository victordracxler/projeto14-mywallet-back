import { Router } from 'express';
import { newEntry } from '../controllers/entryController.js';
import { verifyToken } from '../middlewares/tokenVerificationMiddleware.js';

const router = Router();

router.post('/add-entry', verifyToken, newEntry);

export default router;
