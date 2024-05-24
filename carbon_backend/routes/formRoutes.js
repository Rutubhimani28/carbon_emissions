import express from 'express';
import form from '../controller/form.js';
import auth from '../middelwares/auth.js';

const router = express.Router();

router.get('/', auth, form.index);
router.get('/view/:id', auth, form.view);
router.post('/add', auth, form.add);
router.post('/addMany', auth, form.addMany);
router.put('/edit/:id', auth, form.edit);
router.delete('/delete/:id', auth, form.deleteField);
router.post('/deleteMany', auth, form.deleteManyField);

export default router