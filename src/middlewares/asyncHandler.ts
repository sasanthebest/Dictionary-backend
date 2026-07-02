import type { Request, Response, NextFunction } from "express";

/**
 * Wrap async controllers to catch errors automatically
 */
export const asyncHandler =
  (fn: any) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
