import express from 'express';
import { loginController, ragisterController } from '../controllers/authController.js';

const router=express.Router();

// Ragister || post
router.post('/register',ragisterController)

// login || post
router.post('/login',loginController)

export default router;