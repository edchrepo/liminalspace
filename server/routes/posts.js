import express from 'express';

//need to add .js at the end in node (not in react)
import { getPosts, createPost } from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);

export default router;
