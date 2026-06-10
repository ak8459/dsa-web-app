import express from 'express';
import { getTopics, getTopicById } from '../controllers/topics.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware); // All topic routes require authentication

router.get('/', getTopics);
router.get('/:id', getTopicById);

export default router;
