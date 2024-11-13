import express from 'express';
import UserController from '../controller/userController.js';
import auth from '../middelwares/auth.js';
import upload from '../middelwares/upload.js';

const router = express.Router();

router.get('/', auth, UserController.index);
router.put('/edit/:id', upload.single('logo'), UserController.edit);
router.delete('/delete/:id', auth, UserController.deleteUser);
router.post('/deleteMany', auth, UserController.deleteMany);

export default router;


