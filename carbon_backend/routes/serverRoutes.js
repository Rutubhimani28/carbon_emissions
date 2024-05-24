import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/custom-field', customFieldRoutes);

export default router
