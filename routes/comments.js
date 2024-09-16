import express from 'express';
import {
   getCommnets,
  getCommnet,
  createCommnet,
  updateCommnet,
  deleteCommnet
} from '../controllers/commentsController.js';
const router = express.Router();

// Get all posts
router.get('/', getCommnets);

// Get single post
router.get('/:id', getCommnet);

// Create new post
router.post('/', createCommnet);

// Update Post
router.put('/:id', updateCommnet);

// Delete Post
router.delete('/:id', deleteCommnet);

export default router;
