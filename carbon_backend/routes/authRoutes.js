import express from 'express';
import multer from 'multer';
import auth from '../controller/authController.js';
import upload from '../middelwares/upload.js';
// import storage from '../middelwares/uploadCloudinary.js';
// const uploadCloudinary = multer({ storage: storage.storage });

import uploadCloudinary from '../middelwares/uploadCloudinary.js'; 

const router = express.Router();

// router.post('/register', upload.single('logo'), auth.register);
router.post('/register', uploadCloudinary.single('logo'), auth.register);
router.get('/verifyEmail/:token', auth.verifyRegister);
router.post('/login', auth.login);
router.post('/password-forgot', auth.forgotPassword);
router.put('/password-reset', auth.resetForgotPassword);

export default router;