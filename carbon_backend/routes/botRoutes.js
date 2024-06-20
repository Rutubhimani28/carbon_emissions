import express from 'express';
import botController from '../controller/botController.js';

const router = express.Router();

router.post('/add', botController.add)

export default router;