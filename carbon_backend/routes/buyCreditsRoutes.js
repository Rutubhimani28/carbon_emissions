import express from 'express';
import buyCreditsController from '../controller/buyCreditsController.js';

const router = express.Router();

router.post('/add', buyCreditsController.add)

export default router;