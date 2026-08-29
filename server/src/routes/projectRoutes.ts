import { Router } from "express";

import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from "../controllers/projectController";

const router = Router();

// GET all projects
router.get("/", getProjects);

// GET project by ID
router.get("/:id", getProjectById);

// CREATE project
router.post("/", createProject);

// UPDATE project
router.put("/:id", updateProject);

// DELETE project
router.delete("/:id", deleteProject);

export default router;