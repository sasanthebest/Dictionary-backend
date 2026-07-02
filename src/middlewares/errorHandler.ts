import type { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

/**
 * Global error handling middleware
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let error = err;

  // If not operational error, convert it
  if (!(error instanceof AppError)) {
    error = new AppError(error.message || "Internal Server Error", 500);
  }

  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === "development" && {
      stack: error.stack,
    }),
  });
};
