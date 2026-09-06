<<<<<<< HEAD
import { Prisma, Project as PrismaProject, User as PrismaUser } from "@prisma/client";
import { Priority, ProjectStatus } from "../utils/validators";
import { serializePublicUser } from "./User";

export type PopulatedProject = {
  _id: string;
  name: string;
  description: string;
  dueDate?: Date | null;
  status: ProjectStatus;
  priority: Priority;
  requiredMembers: number;
  isClosed: boolean;
  submittedAt?: Date | null;
  approvedAt?: Date | null;
  leaderId?: string | null;
  leader?: ReturnType<typeof serializePublicUser> | null;
  owner: ReturnType<typeof serializePublicUser>;
  members: ReturnType<typeof serializePublicUser>[];
  technologies: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type IProject = PopulatedProject;

const projectInclude = {
  owner: true,
  leader: true,
  members: {
    include: {
      user: true
    }
  }
} satisfies Prisma.ProjectInclude;

export type ProjectWithRelations = Prisma.ProjectGetPayload<{
  include: typeof projectInclude;
}>;

export const projectIncludeQuery = projectInclude;

export const serializeProject = (
  project: PrismaProject & {
    owner: PrismaUser;
    leader?: PrismaUser | null;
    members: {
      user: PrismaUser;
    }[];
  }
): PopulatedProject => ({
  _id: project.id,
  name: project.name,
  description: project.description,
  dueDate: project.dueDate,
  status: project.status as ProjectStatus,
  priority: project.priority as Priority,
  requiredMembers: project.requiredMembers ?? 3,
  isClosed: project.isClosed ?? false,
  submittedAt: project.submittedAt,
  approvedAt: project.approvedAt,
  leaderId: project.leaderId || null,
  leader: project.leader
    ? serializePublicUser(project.leader)
    : null,
  owner: serializePublicUser(project.owner),
  members: project.members.map((member) =>
    serializePublicUser(member.user)
  ),
  technologies: project.technologies,
  createdAt: project.createdAt,
  updatedAt: project.updatedAt
});
>>>>>>> origin/main
