import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import {
  assertMember,
  findPopulatedTaskOrThrow,
  findProjectOrThrow,
  isOwner
} from "../utils/projectAccess";
import { serializeTask, taskInclude } from "../models/Task";
import {
  PRIORITIES,
  TASK_STATUSES,
  assertNonEmpty,
  assertObjectId,
  parseEnum,
  parseOptionalDate
} from "../utils/validators";

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.params.projectId || req.body.projectId;
  if (!projectId) {
    throw new AppError("Project ID is required to create a task", 400);
  }

  const validProjectId = assertObjectId(projectId, "project id");
  const project = await findProjectOrThrow(validProjectId);

  const { title, description, assignedTo, status, priority, dueDate } = req.body;
  assertNonEmpty(title, "Title");

  let assigneeId: string | null = null;
  if (assignedTo) {
    assigneeId = String(assignedTo);
  }

  const task = await prisma.task.create({
    data: {
      projectId: project._id,
      title: String(title).trim(),
      description: description ? String(description).trim() : "",
      assignedToId: assigneeId || null,
      status: status ? parseEnum(status, TASK_STATUSES, "status") : "TODO",
      priority: priority ? parseEnum(priority, PRIORITIES, "priority") : "MEDIUM",
      dueDate: parseOptionalDate(dueDate) ?? null,
      createdById: req.user!.userId
    }
  });

  sendSuccess(res, await findPopulatedTaskOrThrow(task.id), 201, "Task created");
});

export const getProjectTasks = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId, "project id");
  const project = await findProjectOrThrow(projectId);

  const tasks = await prisma.task.findMany({
    where: { projectId: project._id },
    include: taskInclude,
    orderBy: { createdAt: "desc" }
  });
  sendSuccess(res, tasks.map(serializeTask));
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const taskId = assertObjectId(req.params.id, "task id");
  const task = await findPopulatedTaskOrThrow(taskId);
  sendSuccess(res, task);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = assertObjectId(req.params.id, "task id");
  const existing = await prisma.task.findUnique({ where: { id: taskId } });
  if (!existing) {
    throw new AppError("Task not found", 404);
  }

  const { title, description, assignedTo, status, priority, dueDate } = req.body;
  const data: {
    title?: string;
    description?: string;
    assignedToId?: string | null;
    status?: string;
    priority?: string;
    dueDate?: Date | null;
  } = {};

  if (title !== undefined) {
    assertNonEmpty(title, "Title");
    data.title = String(title).trim();
  }
  if (description !== undefined) {
    data.description = String(description).trim();
  }
  if (assignedTo !== undefined) {
    if (assignedTo === null || assignedTo === "") {
      data.assignedToId = null;
    } else {
      data.assignedToId = String(assignedTo);
    }
  }
  if (status !== undefined) {
    data.status = parseEnum(status, TASK_STATUSES, "status");
  }
  if (priority !== undefined) {
    data.priority = parseEnum(priority, PRIORITIES, "priority");
  }
  if (dueDate !== undefined) {
    data.dueDate = parseOptionalDate(dueDate) ?? null;
  }

  await prisma.task.update({
    where: { id: existing.id },
    data
  });
  sendSuccess(res, await findPopulatedTaskOrThrow(existing.id), 200, "Task updated");
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = assertObjectId(req.params.id, "task id");
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new AppError("Task not found", 404);
  }

  await prisma.task.delete({ where: { id: task.id } });
  sendSuccess(res, { _id: task.id }, 200, "Task deleted");
});

export const getBoardTasks = asyncHandler(async (req: Request, res: Response) => {
  const projectId = req.query.projectId ? String(req.query.projectId) : "";

  if (projectId) {
    const validId = assertObjectId(projectId, "project id");
    const tasks = await prisma.task.findMany({
      where: { projectId: validId },
      include: taskInclude,
      orderBy: { createdAt: "desc" }
    });
    sendSuccess(res, tasks.map(serializeTask));
    return;
  }

  const tasks = await prisma.task.findMany({
    include: taskInclude,
    orderBy: { createdAt: "desc" }
  });
  sendSuccess(res, tasks.map(serializeTask));
});
