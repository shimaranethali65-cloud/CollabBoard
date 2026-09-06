import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { serializeUser } from "../models/User";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { toSafeUser } from "../utils/auth";
import { assertNonEmpty, assertValidEmail } from "../utils/validators";

import { Prisma } from "@prisma/client";

export const searchUsers = asyncHandler(async (req: Request, res: Response) => {
  const q = String(req.query.q || "").trim();

  const where: Prisma.UserWhereInput = q.length >= 1
    ? {
        OR: [
          { name: { contains: q, mode: "insensitive" } },
          { username: { contains: q, mode: "insensitive" } },
          { email: { contains: q, mode: "insensitive" } }
        ]
      }
    : {};

  const users = await prisma.user.findMany({
    where,
    take: 20,
    orderBy: { createdAt: "desc" }
  });

  sendSuccess(
    res,
    users.map((user) => toSafeUser(serializeUser(user)))
  );
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user?.userId }
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  sendSuccess(res, toSafeUser(serializeUser(user)));
});

export const updateMe = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user?.userId }
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }

  const { name, username, email, profileImage } = req.body;
  const data: {
    name?: string;
    username?: string;
    email?: string;
    profileImage?: string;
  } = {};

  if (name !== undefined) {
    assertNonEmpty(name, "Name");
    data.name = String(name).trim();
  }

  if (username !== undefined) {
    assertNonEmpty(username, "Username");
    const normalizedUsername = String(username).trim().toLowerCase();
    const taken = await prisma.user.findFirst({
      where: {
        username: normalizedUsername,
        NOT: { id: user.id }
      }
    });
    if (taken) {
      throw new AppError("This username is already taken", 409);
    }
    data.username = normalizedUsername;
  }

  if (email !== undefined) {
    assertValidEmail(String(email));
    const normalizedEmail = String(email).trim().toLowerCase();
    const taken = await prisma.user.findFirst({
      where: {
        email: normalizedEmail,
        NOT: { id: user.id }
      }
    });
    if (taken) {
      throw new AppError("An account with this email already exists", 409);
    }
    data.email = normalizedEmail;
  }

  if (profileImage !== undefined) {
    data.profileImage = String(profileImage);
  }

  const updated = await prisma.user.update({
    where: { id: user.id },
    data
  });
  sendSuccess(res, toSafeUser(serializeUser(updated)), 200, "Profile updated");
});
