import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';
import digitalContentRoutes from './digitalContentRoutes.js'
import emailRoutes from './emailRoutes.js'

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/custom-field', customFieldRoutes);
router.use('/digitalContent', digitalContentRoutes);
router.use('/email', emailRoutes);

export default router
