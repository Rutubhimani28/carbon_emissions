import express from 'express';
import contactUs from '../controller/contactUs.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, contactUs.index)
router.post('/add', contactUs.add)
router.post('/deleteMany', auth, contactUs.deleteMany)

export default router