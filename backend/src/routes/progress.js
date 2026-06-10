import express from 'express';
import { getProgress, markCompleted, unmarkCompleted } from '../controllers/progress.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware); // All progress routes require authentication

// progress route
router.get('/', getProgress);
// mrk route as compolete
router.post('/:problemId', markCompleted);
router.delete('/:problemId', unmarkCompleted);

export default router;
