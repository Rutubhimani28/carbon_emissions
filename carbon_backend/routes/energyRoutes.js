import express from 'express';
import energyController from '../controller/energyController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, energyController.index);
router.post('/add', auth, energyController.add);
router.post('/addMany', auth, energyController.addMany);
router.put('/:id', auth, energyController.edit);
router.delete('/:id', auth, energyController.deleteData);
router.post('/deleteMany', auth, energyController.deleteMany);

export default router;