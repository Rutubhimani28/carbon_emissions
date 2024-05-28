import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';
import digitalContentRoutes from './digitalContentRoutes.js'
import contactUsRoutes from './contactUsRoutes.js'
import eventRoutes from './eventRoutes.js'

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/custom-field', customFieldRoutes);
router.use('/digitalContent', digitalContentRoutes);
router.use('/contactUs', contactUsRoutes);
router.use('/events', eventRoutes);

export default router
