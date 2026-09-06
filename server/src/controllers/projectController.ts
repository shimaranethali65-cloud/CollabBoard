import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import {
  assertMember,
  assertOwner,
  findProjectOrThrow,
  isMember,
  isOwner,
  withProgress
} from "../utils/projectAccess";
import { projectIncludeQuery, serializeProject } from "../models/Project";
import {
  PRIORITIES,
  PROJECT_STATUSES,
  assertNonEmpty,
  assertObjectId,
  isUUID,
  normalizeStringArray,
  parseEnum,
  parseOptionalDate
} from "../utils/validators";

const resolveMemberIds = async (rawMembers: unknown, ownerId: string): Promise<string[]> => {
  if (!Array.isArray(rawMembers)) return [];
  const cleanInputs = rawMembers.map(String).map((m) => m.trim()).filter(Boolean);
  const resolvedIds: string[] = [];

  for (const identifier of cleanInputs) {
    if (identifier === ownerId) continue;

    let userRecord = null;
    if (isUUID(identifier)) {
      userRecord = await prisma.user.findUnique({ where: { id: identifier } });
    } else {
      userRecord = await prisma.user.findFirst({
        where: {
          OR: [
            { username: { equals: identifier, mode: "insensitive" } },
            { email: { equals: identifier, mode: "insensitive" } },
            { name: { equals: identifier, mode: "insensitive" } }
          ]
        }
      });
    }

    if (userRecord && userRecord.id !== ownerId) {
      resolvedIds.push(userRecord.id);
    }
  }

  return [...new Set(resolvedIds)];
};

const memberWhere = (userId: string) => ({
  OR: [{ ownerId: userId }, { members: { some: { userId } } }]
});

export const getProjects = asyncHandler(async (_req: Request, res: Response) => {
  const projects = await prisma.project.findMany({
    include: projectIncludeQuery,
    orderBy: { updatedAt: "desc" }
  });
  const data = await Promise.all(projects.map((project) => withProgress(serializeProject(project))));
  sendSuccess(res, data);
});

export const getMyProjects = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const projects = await prisma.project.findMany({
    where: memberWhere(userId),
    include: projectIncludeQuery,
    orderBy: { updatedAt: "desc" }
  });
  const data = await Promise.all(projects.map((project) => withProgress(serializeProject(project))));
  sendSuccess(res, data);
});

export const getProjectById = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  sendSuccess(res, await withProgress(project));
});

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.userId;
  if (!userId) {
    throw new AppError("Authentication required to create a project", 401);
  }

  const { name, description, dueDate, status, priority, requiredMembers, members, technologies } = req.body;

  assertNonEmpty(name, "Name");
  assertNonEmpty(description, "Description");

  const parsedRequired = Math.max(1, Number(requiredMembers) || 3);
  const parsedStatus = status
    ? parseEnum(status, PROJECT_STATUSES, "status")
    : "TODO";
  const parsedPriority = priority
    ? parseEnum(priority, PRIORITIES, "priority")
    : "MEDIUM";
  const parsedDueDate = parseOptionalDate(dueDate);

  const uniqueMembers = await resolveMemberIds(members, userId);
  const firstMemberId = uniqueMembers.length > 0 ? uniqueMembers[0] : null;

  const project = await prisma.project.create({
    data: {
      name: String(name).trim(),
      description: String(description).trim(),
      dueDate: parsedDueDate ?? null,
      status: uniqueMembers.length >= parsedRequired ? "DOING" : parsedStatus,
      priority: parsedPriority,
      requiredMembers: parsedRequired,
      isClosed: false,
      ownerId: userId,
      technologies: normalizeStringArray(technologies),
      leaderId: firstMemberId,
      members: {
        create: uniqueMembers.map((memberId) => ({ userId: memberId }))
      }
    }
  });

  const populated = await findProjectOrThrow(project.id);
  sendSuccess(res, await withProgress(populated), 201, "Project created");
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  const userId = req.user!.userId;
  const isAdmin = req.user?.role === "ADMIN";
  if (!isAdmin) {
    assertMember(project, userId);
  }

  const { name, description, dueDate, status, priority, requiredMembers, members, technologies } = req.body;

  const data: {
    name?: string;
    description?: string;
    dueDate?: Date | null;
    status?: string;
    priority?: string;
    requiredMembers?: number;
    technologies?: string[];
  } = {};

  if (name !== undefined) {
    assertNonEmpty(name, "Name");
    data.name = String(name).trim();
  }
  if (description !== undefined) {
    assertNonEmpty(description, "Description");
    data.description = String(description).trim();
  }
  if (dueDate !== undefined) {
    data.dueDate = parseOptionalDate(dueDate) ?? null;
  }
  if (status !== undefined) {
    data.status = parseEnum(status, PROJECT_STATUSES, "status");
  }
  if (priority !== undefined) {
    data.priority = parseEnum(priority, PRIORITIES, "priority");
  }
  if (requiredMembers !== undefined) {
    data.requiredMembers = Math.max(1, Number(requiredMembers) || 3);
  }
  if (technologies !== undefined) {
    data.technologies = normalizeStringArray(technologies);
  }

  if (members !== undefined) {
    if (!isAdmin) {
      assertOwner(project, userId);
    }
    const uniqueMembers = await resolveMemberIds(members, userId);

    // If members are updated, check leadership:
    // If existing leader is still in uniqueMembers, keep them; otherwise the first assigned member is leader!
    let newLeaderId = project.leaderId;
    if (uniqueMembers.length > 0) {
      if (!project.leaderId || !uniqueMembers.includes(project.leaderId)) {
        newLeaderId = uniqueMembers[0];
      }
    } else {
      newLeaderId = null;
    }

    const updatePayload: Record<string, any> = { ...data, leaderId: newLeaderId };

    await prisma.projectMember.deleteMany({ where: { projectId: project._id } });
    if (uniqueMembers.length > 0) {
      await prisma.projectMember.createMany({
        data: uniqueMembers.map((memberId) => ({
          projectId: project._id,
          userId: memberId
        }))
      });
    }
    await prisma.project.update({
      where: { id: project._id },
      data: updatePayload
    });
  } else {
    await prisma.project.update({
      where: { id: project._id },
      data
    });
  }

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project updated");
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  const isAdmin = req.user?.role === "ADMIN";
  if (!isAdmin) {
    assertOwner(project, req.user!.userId);
  }

  await prisma.project.delete({ where: { id: project._id } });
  sendSuccess(res, { _id: project._id }, 200, "Project deleted successfully");
});

export const getMembers = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId, "project id");
  const project = await findProjectOrThrow(projectId);

  const members = project.members.map((member) => ({
    _id: member._id,
    name: member.name,
    username: member.username,
    email: member.email,
    profileImage: member.profileImage || "",
    role: member._id === project.leaderId ? "LEADER" : "MEMBER",
    isLeader: member._id === project.leaderId
  }));

  sendSuccess(res, members);
});

export const addMember = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId, "project id");
  const project = await findProjectOrThrow(projectId);
  assertOwner(project, req.user!.userId);

  const userId = String(req.body.userId || "");
  assertObjectId(userId, "user id");

  if (isMember(project, userId)) {
    throw new AppError("User is already a project member", 409);
  }

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  await prisma.projectMember.create({
    data: { projectId: project._id, userId }
  });

  const updateData: Record<string, any> = {};
  // The first assigned member is the group leader
  if (!project.leaderId) {
    updateData.leaderId = userId;
  }
  const memberCount = await prisma.projectMember.count({
    where: { projectId: project._id }
  });
  if (memberCount >= project.requiredMembers && project.status === "TODO") {
    updateData.status = "DOING";
  }
  if (Object.keys(updateData).length > 0) {
    await prisma.project.update({
      where: { id: project._id },
      data: updateData
    });
  }

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Member added");
});

export const enroll = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId || req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);

  if (req.user?.role === "ADMIN") {
    throw new AppError(
      "Administrator accounts cannot enroll in projects. Please log in with a regular user account to participate in projects.",
      403
    );
  }

  if (project.isClosed) {
    throw new AppError("This project has been closed", 400);
  }
  if (project.status === "DONE" || (project.status as any) === "COMPLETED") {
    throw new AppError("This project is already completed", 400);
  }
  if (project.status === "SUBMITTED") {
    throw new AppError("This project has already been submitted for review", 400);
  }

  const userId = req.user!.userId;
  if (isMember(project, userId)) {
    throw new AppError("You are already enrolled in this project", 409);
  }

  await prisma.projectMember.create({
    data: { projectId: project._id, userId }
  });

  const memberCount = await prisma.projectMember.count({
    where: { projectId: project._id }
  });

  const updateData: Record<string, any> = {};

  // The first person enrolling in the project is marked as the leader
  if (!project.leaderId) {
    updateData.leaderId = userId;
  }

  // Once required members are filled, project officially starts ("DOING")
  if (memberCount >= project.requiredMembers && project.status === "TODO") {
    updateData.status = "DOING";
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.project.update({
      where: { id: project._id },
      data: updateData
    });
  }

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Enrolled successfully");
});

export const unenroll = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId || req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);

  if (req.user?.role === "ADMIN") {
    throw new AppError("Administrator accounts cannot enroll or unenroll from projects", 403);
  }

  const userId = req.user!.userId;
  const deleted = await prisma.projectMember.deleteMany({
    where: { projectId: project._id, userId }
  });

  if (deleted.count === 0) {
    throw new AppError("You are not enrolled in this project", 404);
  }

  const memberCount = await prisma.projectMember.count({
    where: { projectId: project._id }
  });

  const updateData: Record<string, any> = {};

  // If the leader unenrolled, reassign leadership to another remaining member, or null if no members left
  if (project.leaderId === userId) {
    const nextMember = await prisma.projectMember.findFirst({
      where: { projectId: project._id }
    });
    updateData.leaderId = nextMember ? nextMember.userId : null;
  }

  // If members drop below requiredMembers and status is DOING, revert to TODO (filling members)
  if (memberCount < project.requiredMembers && project.status === "DOING") {
    updateData.status = "TODO";
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.project.update({
      where: { id: project._id },
      data: updateData
    });
  }

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Unenrolled successfully");
});

export const changeLeader = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId || req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  const userId = req.user!.userId;

  const currentLeaderId = project.leaderId || (project.members.length > 0 ? project.members[0]._id : null);
  if (!currentLeaderId || currentLeaderId !== userId) {
    throw new AppError("Only the project leader has the power to change the leader", 403);
  }

  const newLeaderId = String(req.body.newLeaderId || req.body.leaderId || req.body.userId || "").trim();
  assertObjectId(newLeaderId, "new leader id");

  if (!isMember(project, newLeaderId)) {
    throw new AppError("The new leader must be an enrolled member of this project", 400);
  }

  if (newLeaderId === currentLeaderId) {
    throw new AppError("User is already the project leader", 400);
  }

  await prisma.project.update({
    where: { id: project._id },
    data: { leaderId: newLeaderId }
  });

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project leader changed successfully");
});

export const submitProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId || req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  const userId = req.user!.userId;

  assertMember(project, userId);

  // Strictly enforce that only the project leader can submit the project
  const currentLeaderId = project.leaderId || (project.members.length > 0 ? project.members[0]._id : null);
  if (!currentLeaderId || currentLeaderId !== userId) {
    throw new AppError("Only the project leader has the power to submit the project", 403);
  }

  if (project.isClosed) {
    throw new AppError("Cannot submit a closed project", 400);
  }
  if (project.status === "DONE" || (project.status as any) === "COMPLETED") {
    throw new AppError("Project is already approved and completed", 400);
  }
  if (project.status === "SUBMITTED") {
    throw new AppError("Project has already been submitted for admin review", 400);
  }

  await prisma.project.update({
    where: { id: project._id },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
      ...(!project.leaderId ? { leaderId: userId } : {})
    }
  });

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project submitted successfully for admin review");
});

export const approveProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);

  await prisma.project.update({
    where: { id: project._id },
    data: {
      status: "DONE",
      approvedAt: new Date()
    }
  });

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project approved and marked as Done");
});

export const closeProject = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);

  await prisma.project.update({
    where: { id: project._id },
    data: {
      status: "CLOSED",
      isClosed: true
    }
  });

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project closed successfully");
});

export const updateDeadline = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.id, "project id");
  const project = await findProjectOrThrow(projectId);
  const dueDate = parseOptionalDate(req.body.dueDate);

  await prisma.project.update({
    where: { id: project._id },
    data: { dueDate: dueDate ?? null }
  });

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Project deadline updated");
});

export const getAdminOverview = asyncHandler(async (_req: Request, res: Response) => {
  const allProjectsRaw = await prisma.project.findMany({
    include: projectIncludeQuery,
    orderBy: { updatedAt: "desc" }
  });

  const allProjects = await Promise.all(
    allProjectsRaw.map((p) => withProgress(serializeProject(p)))
  );

  const stats = {
    totalProjects: allProjects.length,
    todoProjects: allProjects.filter((p) => p.status === "TODO" || (p.status as any) === "PLANNING").length,
    doingProjects: allProjects.filter((p) => p.status === "DOING" || (p.status as any) === "IN_PROGRESS").length,
    submittedProjects: allProjects.filter((p) => p.status === "SUBMITTED").length,
    doneProjects: allProjects.filter((p) => p.status === "DONE" || (p.status as any) === "COMPLETED").length,
    closedProjects: allProjects.filter((p) => p.isClosed || p.status === "CLOSED").length,
  };

  const pendingApprovals = allProjects.filter((p) => p.status === "SUBMITTED");

  sendSuccess(res, { stats, pendingApprovals, allProjects });
});

export const removeMember = asyncHandler(async (req: Request, res: Response) => {
  const projectId = assertObjectId(req.params.projectId, "project id");
  const memberUserId = assertObjectId(req.params.userId, "user id");
  const project = await findProjectOrThrow(projectId);
  assertOwner(project, req.user!.userId);

  if (isOwner(project, memberUserId)) {
    throw new AppError("The project owner cannot be removed", 400);
  }

  const deleted = await prisma.projectMember.deleteMany({
    where: { projectId: project._id, userId: memberUserId }
  });

  if (deleted.count === 0) {
    throw new AppError("Member not found on this project", 404);
  }

  const updated = await findProjectOrThrow(project._id);
  sendSuccess(res, await withProgress(updated), 200, "Member removed");
});
