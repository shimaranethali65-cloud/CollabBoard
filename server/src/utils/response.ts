import { Response } from "express";

export const sendSuccess = (
  res: Response,
  data: unknown,
  statusCode = 200,
  message?: string
) => {
  return res.status(statusCode).json({
    success: true,
    ...(message ? { message } : {}),
    data
  });
};
