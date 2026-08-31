import type { Request, Response } from "express";
import Project from "../models/project";

const members = (value: unknown) => Array.isArray(value) ? value.map((member) => typeof member === "string" ? { name: member, email: "", role: "Member" } : member) : value;
const serialize = (project: any) => ({ id: project._id.toString(), name: project.name, description: project.description, status: project.status, members: project.members.map((member: any) => ({ name: member.name, email: member.email ?? "", role: member.role ?? "Member" })) });

export const getProjects = async (_req: Request, res: Response) => res.json((await Project.find().sort({ createdAt: -1 })).map(serialize));
export const getProjectById = async (req: Request, res: Response) => { const project = await Project.findById(req.params.id); if (!project) return res.status(404).json({ message: "Project not found" }); return res.json(serialize(project)); };
export const createProject = async (req: Request, res: Response) => { const { name, description, status } = req.body; const projectMembers = members(req.body.members); if (!name || !description || !status || !Array.isArray(projectMembers)) return res.status(400).json({ message: "Name, description, status, and members are required" }); const project = await Project.create({ name, description, status, members: projectMembers }); return res.status(201).json(serialize(project)); };
export const updateProject = async (req: Request, res: Response) => { const update: Record<string, unknown> = {}; for (const field of ["name", "description", "status"] as const) if (req.body[field] !== undefined) update[field] = req.body[field]; if (req.body.members !== undefined) update.members = members(req.body.members); const project = await Project.findByIdAndUpdate(req.params.id, update, { new: true, runValidators: true }); if (!project) return res.status(404).json({ message: "Project not found" }); return res.json(serialize(project)); };
