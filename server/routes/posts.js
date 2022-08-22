import express from 'express';

//need to add .js at the end in node (not in react)
import { getPosts, createPost, updatePost} from '../controllers/posts.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);

export default router;
