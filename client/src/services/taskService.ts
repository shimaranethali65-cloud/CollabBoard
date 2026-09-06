import { apiRequest } from "./api";
import type { Task } from "../types";

export const getTasks = (projectId?: string) => {
  const query = projectId ? `?projectId=${projectId}` : "";
  return apiRequest<Task[]>(`/tasks${query}`);
};

export const getProjectTasks = (projectId: string) =>
  apiRequest<Task[]>(`/projects/${projectId}/tasks`);

export const getTaskById = (id: string) => apiRequest<Task>(`/tasks/${id}`);

export const createTask = (
  projectId: string,
  payload: {
    title: string;
    description?: string;
    assignedTo?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  }
) =>
  apiRequest<Task>(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const createBoardTask = (payload: {
  title: string;
  projectId?: string;
  description?: string;
  assignedTo?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}) =>
  apiRequest<Task>("/tasks", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const updateTask = (
  id: string,
  payload: Partial<{
    title: string;
    description: string;
    assignedTo: string | null;
    status: string;
    priority: string;
    dueDate: string;
  }>
) =>
  apiRequest<Task>(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });

export const deleteTask = (id: string) =>
  apiRequest(`/tasks/${id}`, { method: "DELETE" });
