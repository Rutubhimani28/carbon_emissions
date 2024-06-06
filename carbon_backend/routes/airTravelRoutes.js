import express from 'express';
import airTravelController from '../controller/airTravelController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, airTravelController.index)
router.post('/add', auth, airTravelController.add)
router.post('/addMany', auth, airTravelController.addMany)
router.put('/:id', auth, airTravelController.edit)
router.delete('/:id', auth, airTravelController.deleteData)
router.post('/deleteMany', auth, airTravelController.deleteMany)

export default router