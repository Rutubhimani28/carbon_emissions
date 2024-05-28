import express from 'express';
import email from '../controller/emailController.js'
import auth from '../middelwares/auth.js';

const router = express.Router();

router.post('/add', auth, email.addEmail)

export default router;