import { User as PrismaUser } from "@prisma/client";

export interface IUser {
  _id: string;
  name: string;
  username: string;
  email: string;
  role?: string;
  passwordHash?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export const serializeUser = (
  user: PrismaUser,
  options: { includePasswordHash?: boolean } = {}
): IUser => {
  const serialized: IUser = {
    _id: user.id,
    name: user.name,
    username: user.username,
    email: user.email,
    role: user.role || "USER",
    profileImage: user.profileImage || "",
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };

  if (options.includePasswordHash) {
    serialized.passwordHash = user.passwordHash;
  }

  return serialized;
};

export const serializePublicUser = (user: PrismaUser) => ({
  _id: user.id,
  name: user.name,
  username: user.username,
  email: user.email,
  role: user.role || "USER",
  profileImage: user.profileImage || ""
});
