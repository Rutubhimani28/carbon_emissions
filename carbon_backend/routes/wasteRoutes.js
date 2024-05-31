import express from 'express';
import wasteController from '../controller/wasteController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, wasteController.index);
router.post('/add', auth, wasteController.add);
router.post('/addMany', auth, wasteController.addMany);
router.put('/:id', auth, wasteController.edit);
router.delete('/:id', auth, wasteController.deleteData);
router.post('/deleteMany', auth, wasteController.deleteMany);

export default router;