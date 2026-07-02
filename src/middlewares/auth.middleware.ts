import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const header = req.headers.authorization;

    if (!header) {
      return res.status(401).json({ message: "No token provided" });
    }

    const parts = header.split(" ");

    if (parts.length !== 2) {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const token = parts[1];
    if (!token) {
      return res.status(401).json({ message: "Token is undefined" });
    }

    const decoded = verifyAccessToken(token) as { id: string };

    (req as any).user = decoded;

    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};
