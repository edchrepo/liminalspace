import express from 'express';

//need to add .js at the end in node (not in react)
import { signin, signup } from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);

export default router;