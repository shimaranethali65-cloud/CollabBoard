import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController';

const router = express.Router();

router.get('/profile', getUserProfile);
router.get('/profile/:userId', getUserProfile);
router.put('/profile/:userId', updateUserProfile);

export default router;
