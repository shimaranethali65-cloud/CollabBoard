import { Router } from "express";
import {
  createTask,
  deleteTask,
  getBoardTasks,
  getTaskById,
  updateTask
} from "../controllers/taskController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.use(requireAuth);
router.get("/", getBoardTasks);
router.post("/", createTask);
router.get("/:id", getTaskById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
