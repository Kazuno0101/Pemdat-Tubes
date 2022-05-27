import express from 'express';
import { getPosts, getPostById, createPost, updatePost, deletePost } from '../controllers/postController.js';
import { getComment, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentController.js';

const router = express.Router();

// Post
router.get('/post', getPosts);
router.get('/post/:id', getPostById);
router.post('/post', createPost);
router.patch('/post/:id', updatePost);
router.delete('/post/:id', deletePost);

// Comment
router.get('/post/comment', getComment);
router.get('/post/comment/:id', getCommentById);
router.post('/post/comment/:id', createComment);
router.patch('/post/comment/:id', updateComment);
router.delete('/post/comment/:id', deleteComment);
export default router;
