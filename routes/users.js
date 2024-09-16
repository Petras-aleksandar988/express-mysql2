import express from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';
const router = express.Router();

// Get all posts
router.get('/', getUsers);

// Get single post
router.get('/:id', getUser);

router.post('/login', loginUser);

// Create new post
router.post('/', createUser);

// Update Post
router.put('/:id', updateUser);

// Delete Post
router.delete('/:id', deleteUser);

export default router;
