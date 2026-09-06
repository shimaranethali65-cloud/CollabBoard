import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

export interface AuthPayload {
  userId: string;
  email: string;
  role?: string;
}

export const requireAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return next(new AppError("Authentication required", 401));
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next(new AppError("Server authentication is not configured", 500));
  }

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    if (!payload.userId || !payload.email) {
      return next(new AppError("Invalid authentication token", 401));
    }
    req.user = { userId: payload.userId, email: payload.email, role: payload.role || "USER" };
    next();
  } catch {
    next(new AppError("Invalid or expired authentication token", 401));
  }
};

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  requireAuth(req, res, (err) => {
    if (err) return next(err);
    if (req.user?.role !== "ADMIN") {
      return next(new AppError("Administrator access required", 403));
    }
    next();
  });
};

export const optionalAuth = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;

  if (!token) {
    return next();
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return next();
  }

  try {
    const payload = jwt.verify(token, secret) as AuthPayload;
    if (payload.userId && payload.email) {
      req.user = { userId: payload.userId, email: payload.email, role: payload.role || "USER" };
    }
  } catch {
    // Ignore invalid token in optionalAuth
  }
  next();
};
