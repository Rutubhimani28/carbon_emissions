import express from 'express';
import eventDataController from '../controller/eventDataController.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, eventDataController.index);
router.get('/events-emissions-list', auth, eventDataController.getEventsEmissionsRecords);
router.post('/add', auth, eventDataController.add);
router.put('/:id', auth, eventDataController.edit);

export default router;