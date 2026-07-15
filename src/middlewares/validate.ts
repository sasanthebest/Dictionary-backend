import type { Request, Response, NextFunction } from "express";
import type { z } from "zod";

export const validate =
  <T extends z.ZodTypeAny>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: result.error,
      });
      return;
    }

    req.body = result.data;
    next();
  };
