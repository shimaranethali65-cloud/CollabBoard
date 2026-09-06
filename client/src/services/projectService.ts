import { apiRequest } from "./api";
import type { Member, Project, AdminOverview } from "../types";

export const getProjects = () => apiRequest<Project[]>("/projects");

export const getMyProjects = () => apiRequest<Project[]>("/projects/my");

export const getProjectById = (id: string) => apiRequest<Project>(`/projects/${id}`);

export const createProject = (payload: {
  name: string;
  description: string;
  dueDate?: string;
  status?: string;
  priority?: string;
  requiredMembers?: number;
  members?: string[];
  technologies?: string[];
}) =>
  apiRequest<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(payload)
  });

export const updateProject = (
  id: string,
  payload: Partial<{
    name: string;
    description: string;
    dueDate: string;
    status: string;
    priority: string;
    requiredMembers: number;
    members: string[];
    technologies: string[];
  }>
) =>
  apiRequest<Project>(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });

export const deleteProject = (id: string) =>
  apiRequest(`/projects/${id}`, { method: "DELETE" });

export const getProjectMembers = (projectId: string) =>
  apiRequest<Member[]>(`/projects/${projectId}/members`);

export const addProjectMember = (projectId: string, userId: string) =>
  apiRequest<Project>(`/projects/${projectId}/members`, {
    method: "POST",
    body: JSON.stringify({ userId })
  });

export const enrollInProject = (projectId: string) =>
  apiRequest<Project>(`/projects/${projectId}/enroll`, { method: "POST" });

export const unenrollFromProject = (projectId: string) =>
  apiRequest<Project>(`/projects/${projectId}/unenroll`, { method: "POST" });

export const submitProject = (projectId: string) =>
  apiRequest<Project>(`/projects/${projectId}/submit`, { method: "POST" });

export const changeProjectLeader = (projectId: string, newLeaderId: string) =>
  apiRequest<Project>(`/projects/${projectId}/leader`, {
    method: "POST",
    body: JSON.stringify({ newLeaderId })
  });

export const approveProject = (projectId: string) =>
  apiRequest<Project>(`/projects/${projectId}/approve`, { method: "POST" });

export const closeProject = (projectId: string) =>
  apiRequest<Project>(`/projects/${projectId}/close`, { method: "POST" });

export const updateProjectDeadline = (projectId: string, dueDate?: string) =>
  apiRequest<Project>(`/projects/${projectId}/deadline`, {
    method: "PUT",
    body: JSON.stringify({ dueDate })
  });

export const getAdminOverview = () =>
  apiRequest<AdminOverview>("/projects/admin/overview");

export const removeProjectMember = (projectId: string, userId: string) =>
  apiRequest(`/projects/${projectId}/members/${userId}`, { method: "DELETE" });
