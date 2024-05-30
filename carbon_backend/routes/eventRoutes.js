import express from 'express';
import event from '../controller/event.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/event-venue', auth, event.eventVenueList)
router.get('/event-execution-agency', auth, event.eventExecutionAgencyList)
router.post('/event-venue', event.eventVenue)
router.post('/event-execution-agency', event.eventExecutionAgency)
router.delete('/event-venue', auth, event.eventVenueDeleteMany)
router.delete('/event-execution-agency', auth, event.eventExecutionAgencyDeleteMany)

export default router

