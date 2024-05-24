import express from 'express';
import userRoutes from './authRoutes.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.use('/auth', userRoutes);

export default router
