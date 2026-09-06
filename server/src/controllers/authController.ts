import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma";
import { serializeUser } from "../models/User";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";
import { sendSuccess } from "../utils/response";
import { signToken, toSafeUser } from "../utils/auth";
import {
  assertNonEmpty,
  assertValidEmail,
  assertValidPassword,
  assertValidUsername
} from "../utils/validators";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, username, email, password } = req.body;

  assertNonEmpty(username, "Username");
  assertNonEmpty(password, "Password");
  assertValidUsername(String(username));
  assertValidPassword(String(password));

  const normalizedUsername = String(username).trim().toLowerCase();
  const rawEmail = email ? String(email).trim().toLowerCase() : "";
  if (rawEmail) {
    assertValidEmail(rawEmail);
  }
  const normalizedEmail = rawEmail || `${normalizedUsername}@collabboard.local`;
  const displayName = name && String(name).trim() ? String(name).trim() : normalizedUsername;

  const existingUsername = await prisma.user.findUnique({
    where: { username: normalizedUsername }
  });
  if (existingUsername) {
    throw new AppError("This username is already taken", 409);
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email: normalizedEmail }
  });
  if (existingEmail) {
    throw new AppError("An account with this email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(String(password), 10);
  const user = await prisma.user.create({
    data: {
      name: displayName,
      username: normalizedUsername,
      email: normalizedEmail,
      passwordHash
    }
  });

  const serialized = serializeUser(user, { includePasswordHash: true });
  const token = signToken(serialized);

  sendSuccess(
    res,
    {
      token,
      user: toSafeUser(serialized)
    },
    201,
    "Account created successfully"
  );
});

export const ensureDefaultAdmin = async () => {
  try {
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { username: "admin" },
          { email: "admin@collabboard.dev" }
        ]
      }
    });

    const passwordHash = await bcrypt.hash("admin123", 10);

    if (!existing) {
      await prisma.user.create({
        data: {
          name: "System Administrator",
          username: "admin",
          email: "admin@collabboard.dev",
          passwordHash,
          role: "ADMIN"
        }
      });
      console.log("Default admin initialized: admin / admin123 (ADMIN)");
    } else if (existing.role !== "ADMIN") {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: "ADMIN", passwordHash }
      });
    }
  } catch (err) {
    console.error("Could not ensure default admin:", err);
  }
};

export const login = asyncHandler(async (req: Request, res: Response) => {
  const identifier = String(
    req.body.username || req.body.email || req.body.identifier || ""
  ).trim().toLowerCase();
  const password = String(req.body.password || "");

  assertNonEmpty(identifier, "Username or Email");
  assertNonEmpty(password, "Password");

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier },
        { email: identifier }
      ]
    }
  });

  if (!user) {
    throw new AppError("Invalid username or password", 401);
  }

  // Reject administrator accounts on regular user login portal
  if (user.role === "ADMIN") {
    throw new AppError("Administrator accounts cannot log in through the user portal. Please access the Admin Panel directly via /admin.", 403);
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new AppError("Invalid username or password", 401);
  }

  const serialized = serializeUser(user, { includePasswordHash: true });
  const token = signToken(serialized);
  sendSuccess(res, {
    token,
    user: toSafeUser(serialized)
  });
});

export const adminLogin = asyncHandler(async (req: Request, res: Response) => {
  const identifier = String(
    req.body.username || req.body.email || req.body.identifier || ""
  ).trim().toLowerCase();
  const password = String(req.body.password || "");

  assertNonEmpty(identifier, "Username or Email");
  assertNonEmpty(password, "Password");

  await ensureDefaultAdmin();

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: identifier },
        { email: identifier }
      ]
    }
  });

  if (!user) {
    throw new AppError("Invalid administrator credentials", 401);
  }

  // Reject regular user accounts on admin login portal
  if (user.role !== "ADMIN") {
    throw new AppError("Access denied. Only administrator accounts can access the Admin Panel. Regular users should log in at /login.", 403);
  }

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) {
    throw new AppError("Invalid administrator credentials", 401);
  }

  const serialized = serializeUser(user, { includePasswordHash: true });
  const token = signToken(serialized);
  sendSuccess(res, {
    token,
    user: toSafeUser(serialized)
  });
});

export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user?.userId }
  });
  if (!user) {
    throw new AppError("User not found", 404);
  }
  sendSuccess(res, toSafeUser(serializeUser(user)));
});
