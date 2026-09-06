import { prisma } from "../config/prisma";
import { IProject, serializeProject, projectIncludeQuery } from "../models/Project";
import { serializeTask, taskInclude } from "../models/Task";
import { AppError } from "./AppError";

export const findProjectOrThrow = async (projectId: string) => {
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    include: projectIncludeQuery
  });
  if (!project) {
    throw new AppError("Project not found", 404);
  }
  return serializeProject(project);
};

export const isOwner = (project: IProject, userId: string) =>
  String(project.owner._id) === userId;

export const isMember = (project: IProject, userId: string) => {
  return project.members.some((member) => String(member._id) === userId);
};

export const assertMember = (project: IProject, userId: string) => {
  if (!isMember(project, userId) && !isOwner(project, userId)) {
    throw new AppError("You are not a member of this project", 403);
  }
};

export const assertOwner = (project: IProject, userId: string) => {
  if (!isOwner(project, userId)) {
    throw new AppError("Only the project owner can perform this action", 403);
  }
};

export const getProjectProgress = async (projectId: string) => {
  const tasks = await prisma.task.findMany({
    where: { projectId },
    select: { status: true }
  });
  if (tasks.length === 0) {
    return 0;
  }
  const done = tasks.filter((task) => task.status === "DONE").length;
  return Math.round((done / tasks.length) * 100);
};

export const withProgress = async (project: IProject) => {
  const progress = await getProjectProgress(project._id);
  return { ...project, id: project._id, progress };
};

export const findPopulatedTaskOrThrow = async (id: string) => {
  const task = await prisma.task.findUnique({
    where: { id },
    include: taskInclude
  });
  if (!task) {
    throw new AppError("Task not found", 404);
  }
  return serializeTask(task);
};
