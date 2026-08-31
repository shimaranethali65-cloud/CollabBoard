"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectController_1 = require("../controllers/projectController");
const router = (0, express_1.Router)();
// GET all projects
router.get("/", projectController_1.getProjects);
// GET project by ID
router.get("/:id", projectController_1.getProjectById);
// CREATE project
router.post("/", projectController_1.createProject);
// UPDATE project
router.put("/:id", projectController_1.updateProject);
// DELETE project
router.delete("/:id", projectController_1.deleteProject);
exports.default = router;
