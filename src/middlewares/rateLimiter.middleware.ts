import type { Request, Response, NextFunction } from "express";
import { redisRateLimiter } from "../config/redisRateLimiter";

/**
 * Extract a stable client identifier (IP-safe, proxy-safe)
 */
const getClientKey = (req: Request): string => {
  const forwarded = req.headers["x-forwarded-for"];

  const firstIp =
    typeof forwarded === "string" ? forwarded.split(",")[0] : req.ip;

  return firstIp?.trim() || "unknown";
};

/**
 * Redis-based rate limiting middleware
 * Prevents abuse and excessive requests per IP
 */
export const rateLimiterMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const key = getClientKey(req);

    await redisRateLimiter.consume(key);

    next();
  } catch {
    return res.status(429).json({
      success: false,
      message: "Too many requests, please try again later.",
    });
  }
};
