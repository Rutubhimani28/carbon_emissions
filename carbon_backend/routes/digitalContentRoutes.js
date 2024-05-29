import express from 'express';
import digitalContentController from '../controller/digitalContentController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, digitalContentController.index)
router.post('/add', auth, digitalContentController.add)
router.post('/addMany', auth, digitalContentController.addMany)
router.put('/:id', auth, digitalContentController.edit)
router.delete('/:id', auth, digitalContentController.deleteData)
router.post('/deleteMany', auth, digitalContentController.deleteMany)

export default router