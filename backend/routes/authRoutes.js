import { Router } from 'express';
import { registerUser, loginUser, loginAdmin } from '../controllers/authController.js';

const router = Router();

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', loginUser);

// Login admin
router.post('/admin/login', loginAdmin);

export default router;