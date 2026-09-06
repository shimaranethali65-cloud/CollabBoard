import { Router } from "express";
import {
  addMember,
  approveProject,
  changeLeader,
  closeProject,
  createProject,
  deleteProject,
  enroll,
  getAdminOverview,
  getMembers,
  getMyProjects,
  getProjectById,
  getProjects,
  removeMember,
  submitProject,
  unenroll,
  updateDeadline,
  updateProject
} from "../controllers/projectController";
import { createTask, getProjectTasks } from "../controllers/taskController";
import { optionalAuth, requireAdmin, requireAuth } from "../middleware/requireAuth";

const router = Router();

// Public / open endpoints as specified in PDF REST API Documentation
router.get("/", optionalAuth, getProjects);

// Project creation is Admin only
router.post("/", requireAdmin, createProject);

// Admin overview endpoint (placed before /:id)
router.get("/admin/overview", requireAdmin, getAdminOverview);

// Authenticated sub-resources
router.get("/my", requireAuth, getMyProjects);
router.get("/:id", optionalAuth, getProjectById);

// Project editing & deletion are Admin only
router.put("/:id", requireAdmin, updateProject);
router.delete("/:id", requireAdmin, deleteProject);

// Project lifecycle actions
router.post("/:id/submit", requireAuth, submitProject);
router.post("/:id/approve", requireAdmin, approveProject);
router.post("/:id/close", requireAdmin, closeProject);
router.put("/:id/deadline", requireAdmin, updateDeadline);

router.get("/:projectId/members", optionalAuth, getMembers);
router.post("/:projectId/members", requireAuth, addMember);
router.post("/:projectId/leader", requireAuth, changeLeader);
router.put("/:projectId/leader", requireAuth, changeLeader);
router.post("/:projectId/enroll", requireAuth, enroll);
router.post("/:projectId/unenroll", requireAuth, unenroll);
router.delete("/:projectId/unenroll", requireAuth, unenroll);
router.delete("/:projectId/members/:userId", requireAuth, removeMember);

router.post("/:projectId/tasks", requireAuth, createTask);
router.get("/:projectId/tasks", optionalAuth, getProjectTasks);

export default router;
