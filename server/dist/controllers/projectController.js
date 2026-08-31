"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectById = exports.getProjects = void 0;
const project_1 = __importDefault(require("../models/project"));
const normalizeMembers = (members) => Array.isArray(members)
    ? members.map((member) => typeof member === "string"
        ? { name: member, email: "", role: "Member" }
        : member)
    : members;
const serializeProject = (project) => ({
    id: project._id.toString(),
    name: project.name,
    description: project.description,
    status: project.status,
    members: project.members.map((member) => ({
        name: member.name,
        email: member.email,
        role: member.role,
    })),
});
const getProjects = async (_req, res) => {
    const projects = await project_1.default.find().sort({ createdAt: -1 });
    res.json(projects.map(serializeProject));
};
exports.getProjects = getProjects;
const getProjectById = async (req, res) => {
    const project = await project_1.default.findById(req.params.id);
    if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
    }
    res.json(serializeProject(project));
};
exports.getProjectById = getProjectById;
const createProject = async (req, res) => {
    const { name, description, status } = req.body;
    const members = normalizeMembers(req.body.members);
    if (!name || !description || !status || !Array.isArray(members) || members.some((member) => !member?.name)) {
        res.status(400).json({ message: "Please provide all project details" });
        return;
    }
    const project = await project_1.default.create({ name, description, status, members });
    res.status(201).json(serializeProject(project));
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const { name, description, status } = req.body;
    const members = normalizeMembers(req.body.members);
    if (members !== undefined && (!Array.isArray(members) || members.some((member) => !member?.name))) {
        res.status(400).json({ message: "Each member must include a name" });
        return;
    }
    const project = await project_1.default.findByIdAndUpdate(req.params.id, { name, description, status, members }, { new: true, runValidators: true });
    if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
    }
    res.json(serializeProject(project));
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const project = await project_1.default.findByIdAndDelete(req.params.id);
    if (!project) {
        res.status(404).json({ message: "Project not found" });
        return;
    }
    res.json({ message: "Project deleted successfully", project: serializeProject(project) });
};
exports.deleteProject = deleteProject;
