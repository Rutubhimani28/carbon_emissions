import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/customField', customFieldRoutes);

export default router
