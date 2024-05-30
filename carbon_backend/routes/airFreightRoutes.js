import express from 'express';
import airFreightController from '../controller/airFreightController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, airFreightController.index);
router.post('/add', auth, airFreightController.add);
router.post('/addMany', auth, airFreightController.addMany);
router.put('/:id', auth, airFreightController.edit);
router.delete('/:id', auth, airFreightController.deleteData);
router.post('/deleteMany', auth, airFreightController.deleteMany);

export default router;