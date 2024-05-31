import express from 'express';
import localTransportController from '../controller/localTransportationController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, localTransportController.index);
router.post('/add', auth, localTransportController.add);
router.post('/addMany', auth, localTransportController.addMany);
router.put('/:id', auth, localTransportController.edit);
router.delete('/:id', auth, localTransportController.deleteData);
router.post('/deleteMany', auth, localTransportController.deleteMany);

export default router;