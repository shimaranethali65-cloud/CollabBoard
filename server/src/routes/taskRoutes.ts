import { Router } from "express";
import { getProjectTasks } from "../controllers/taskController";

const router = Router();

// Route: GET /api/tasks/:projectId
router.get("/:projectId", getProjectTasks);

export default router;