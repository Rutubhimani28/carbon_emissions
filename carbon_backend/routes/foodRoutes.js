import express from 'express';
import foodController from '../controller/foodController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, foodController.index);
router.post('/add', auth, foodController.add);
router.post('/addMany', auth, foodController.addMany);
router.put('/:id', auth, foodController.edit);
router.delete('/:id', auth, foodController.deleteData);
router.post('/deleteMany', auth, foodController.deleteMany);

export default router;