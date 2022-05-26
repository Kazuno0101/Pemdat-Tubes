import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';

const router = express.Router();

router.get('/post', getPosts);
router.get('/post/:id', getPostById);
router.post('/post', createPost);
router.patch('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

export default router;
