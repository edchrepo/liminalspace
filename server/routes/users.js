import express from 'express';

//need to add .js at the end in node (not in react)
import auth from '../middleware/auth.js';
import { signin, signup, updateUser } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.patch('/update', auth, updateUser);

export default router;