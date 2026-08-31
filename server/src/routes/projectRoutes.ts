import express from 'express';
import { getProjects, getUserProjects } from '../controllers/projectController';

const router = express.Router();

router.get('/', getProjects);
router.get('/user/:userId', getUserProjects);

export default router;
