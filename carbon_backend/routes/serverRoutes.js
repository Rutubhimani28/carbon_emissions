import express from 'express';
import authRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';
import digitalContentRoutes from './digitalContentRoutes.js'
import emailRoutes from './emailRoutes.js'
import contactUsRoutes from './contactUsRoutes.js'
import eventRoutes from './eventRoutes.js'
import airFreightRoutes from './airFreightRoutes.js'
import botRoutes from './botRoutes.js'
import toolRoutes from './toolRoutes.js'
import buyCreditsRoutes from './buyCreditsRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/custom-field', customFieldRoutes);
router.use('/digitalContent', digitalContentRoutes);
router.use('/email', emailRoutes);
router.use('/contactUs', contactUsRoutes);
router.use('/events', eventRoutes);
router.use('/airFreight', airFreightRoutes);
router.use('/bot', botRoutes);
router.use('/tool', toolRoutes);
router.use('/buyCredits', buyCreditsRoutes);
router.use('/user', userRoutes);

export default router
