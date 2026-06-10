import express from 'express';
import { register, login, me } from '../controllers/auth.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register); // route to regsietr

router.post('/login', login); // login route

router.get('/me', authMiddleware, me); // testing route

export default router;
