import { Prisma, Task as PrismaTask, User as PrismaUser } from "@prisma/client";
import { Priority, TaskStatus } from "../utils/validators";
import { serializePublicUser } from "./User";

export type SerializedTask = {
  _id: string;
  project: { _id: string; name: string } | string;
  title: string;
  description: string;
  assignedTo?: ReturnType<typeof serializePublicUser> | null;
  status: TaskStatus;
  priority: Priority;
  dueDate?: Date | null;
  createdBy?: ReturnType<typeof serializePublicUser> | string;
  createdAt: Date;
  updatedAt: Date;
};

export type ITask = SerializedTask;

export const taskInclude = {
  assignedTo: true,
  createdBy: true,
  project: { select: { id: true, name: true } }
} satisfies Prisma.TaskInclude;

export const serializeTask = (
  task: PrismaTask & {
    assignedTo?: PrismaUser | null;
    createdBy?: PrismaUser;
    project?: { id: string; name: string } | string;
  }
): SerializedTask => ({
  _id: task.id,
  project:
    task.project && typeof task.project === "object"
      ? { _id: task.project.id, name: task.project.name }
      : task.projectId,
  title: task.title,
  description: task.description,
  assignedTo: task.assignedTo ? serializePublicUser(task.assignedTo) : null,
  status: task.status as TaskStatus,
  priority: task.priority as Priority,
  dueDate: task.dueDate,
  createdBy: task.createdBy ? serializePublicUser(task.createdBy) : task.createdById,
  createdAt: task.createdAt,
  updatedAt: task.updatedAt
});
