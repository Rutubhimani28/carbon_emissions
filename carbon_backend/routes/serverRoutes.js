import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';
import digitalContentRoutes from './digitalContentRoutes.js'
import emailRoutes from './emailRoutes.js'
import contactUsRoutes from './contactUsRoutes.js'
import eventRoutes from './eventRoutes.js'
import airFreightRoutes from './airFreightRoutes.js'
import botRoutes from './botRoutes.js'

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/custom-field', customFieldRoutes);
router.use('/digitalContent', digitalContentRoutes);
router.use('/email', emailRoutes);
router.use('/contactUs', contactUsRoutes);
router.use('/events', eventRoutes);
router.use('/airFreight', airFreightRoutes);
router.use('/bot', botRoutes);

export default router
