import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { withProgress } from "../utils/projectAccess";
import { projectIncludeQuery, serializeProject } from "../models/Project";
import { serializeTask, taskInclude } from "../models/Task";

export const getDashboardStats = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const projects = await prisma.project.findMany({
    where: {
      OR: [{ ownerId: userId }, { members: { some: { userId } } }]
    },
    include: projectIncludeQuery,
    orderBy: { updatedAt: "desc" }
  });

  const serializedProjects = projects.map(serializeProject);
  const projectIds = serializedProjects.map((project) => project._id);
  const tasks = await prisma.task.findMany({
    where: { projectId: { in: projectIds } },
    include: taskInclude,
    orderBy: { updatedAt: "desc" }
  });
  const serializedTasks = tasks.map(serializeTask);

  const now = new Date();
  const todoTasks = serializedTasks.filter((task) => task.status === "TODO").length;
  const inProgressTasks = serializedTasks.filter((task) => task.status === "IN_PROGRESS").length;
  const completedTasks = serializedTasks.filter((task) => task.status === "DONE").length;
  const overdueTasks = serializedTasks.filter(
    (task) => task.dueDate && task.status !== "DONE" && task.dueDate < now
  ).length;

  const recentProjects = await Promise.all(
    serializedProjects.slice(0, 4).map((project) => withProgress(project))
  );

  sendSuccess(res, {
    totalProjects: serializedProjects.length,
    totalTasks: serializedTasks.length,
    todoTasks,
    inProgressTasks,
    completedTasks,
    overdueTasks,
    recentProjects,
    recentTasks: serializedTasks.slice(0, 8)
  });
});
