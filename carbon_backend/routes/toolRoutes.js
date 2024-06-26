import express from 'express';
import toolController from '../controller/toolController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, toolController.index);
router.post('/add', auth, toolController.add);
router.put('/edit', auth, toolController.edit);

export default router;