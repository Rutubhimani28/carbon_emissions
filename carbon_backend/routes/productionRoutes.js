import express from 'express';
import productionController from '../controller/productionController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, productionController.index)
router.post('/add', auth, productionController.add)
router.post('/addMany', auth, productionController.addMany)
router.put('/:id', auth, productionController.edit)
router.delete('/:id', auth, productionController.deleteData)
router.post('/deleteMany', auth, productionController.deleteMany)

export default router