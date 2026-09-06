import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const isProduction = process.env.NODE_ENV === "production";

  if (!(err instanceof AppError)) {
    console.error(err);
  }

  res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500 && isProduction
        ? "Internal server error"
        : err.message || "Internal server error"
  });
};

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction) => {
  if (req.path.startsWith("/api")) {
    next(new AppError("API endpoint not found", 404));
    return;
  }
  next();
};
