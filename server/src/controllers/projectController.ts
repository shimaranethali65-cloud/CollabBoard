import { Request, Response } from "express";
import { projects } from "../data/projects";
import { Project } from "../models/project";

// GET all projects
export const getProjects = (
  req: Request,
  res: Response
): void => {
  res.json(projects);
};

// GET one project by ID
export const getProjectById = (
  req: Request,
  res: Response
): void => {
  const id = Number(req.params.id);

  const project = projects.find((project) => project.id === id);

  if (!project) {
    res.status(404).json({
      message: "Project not found"
    });
    return;
  }

  res.json(project);
};

// CREATE a new project
export const createProject = (
  req: Request,
  res: Response
): void => {
  const { name, description, status, members } = req.body;

  if (!name || !description || !status || !members) {
    res.status(400).json({
      message: "Please provide all project details"
    });
    return;
  }

  const newProject: Project = {
    id: projects.length + 1,
    name,
    description,
    status,
    members
  };

  projects.push(newProject);

  res.status(201).json(newProject);
};

// UPDATE a project
export const updateProject = (
  req: Request,
  res: Response
): void => {
  const id = Number(req.params.id);

  const projectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (projectIndex === -1) {
    res.status(404).json({
      message: "Project not found"
    });
    return;
  }

  const { name, description, status, members } = req.body;

  projects[projectIndex] = {
    ...projects[projectIndex],
    name: name ?? projects[projectIndex].name,
    description: description ?? projects[projectIndex].description,
    status: status ?? projects[projectIndex].status,
    members: members ?? projects[projectIndex].members
  };

  res.json(projects[projectIndex]);
};

// DELETE a project
export const deleteProject = (
  req: Request,
  res: Response
): void => {
  const id = Number(req.params.id);

  const projectIndex = projects.findIndex(
    (project) => project.id === id
  );

  if (projectIndex === -1) {
    res.status(404).json({
      message: "Project not found"
    });
    return;
  }

  const deletedProject = projects.splice(projectIndex, 1);

  res.json({
    message: "Project deleted successfully",
    project: deletedProject[0]
  });
};