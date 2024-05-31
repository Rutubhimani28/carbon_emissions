import express from 'express';
import userRoutes from './authRoutes.js';
import customFieldRoutes from './customFieldRoutes.js';
import digitalContentRoutes from './digitalContentRoutes.js'
import emailRoutes from './emailRoutes.js'
import contactUsRoutes from './contactUsRoutes.js'
import eventRoutes from './eventRoutes.js'
import airFreightRoutes from './airFreightRoutes.js'
import foodRoutes from './foodRoutes.js'
import energyRoutes from './energyRoutes.js'
import localTransportationRoutes from './localTransportationRoutes.js'
import wasteRoutes from './wasteRoutes.js'

const router = express.Router();

router.use('/auth', userRoutes);
router.use('/custom-field', customFieldRoutes);
router.use('/digitalContent', digitalContentRoutes);
router.use('/email', emailRoutes);
router.use('/contactUs', contactUsRoutes);
router.use('/events', eventRoutes);
router.use('/airFreight', airFreightRoutes);
router.use('/food', foodRoutes);
router.use('/energy', energyRoutes);
router.use('/local-transport', localTransportationRoutes);
router.use('/waste', wasteRoutes);

export default router
