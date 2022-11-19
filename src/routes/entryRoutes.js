import { Router } from 'express';
import { getEntries, newEntry } from '../controllers/entryController.js';
import { verifyToken } from '../middlewares/tokenVerificationMiddleware.js';

const router = Router();

router.post('/add-entry', verifyToken, newEntry);

router.get('/entries', verifyToken, getEntries);

export default router;
