import type { Request } from "express";

/**
 * Extract a stable client identifier for rate limiting
 */
export const getClientKey = (req: Request): string => {
  const forwarded = req.headers["x-forwarded-for"];

  if (typeof forwarded === "string") {
    const ips = forwarded.split(",");
    const firstIp = ips[0];

    if (firstIp) return firstIp.trim();
  }

  return req.ip ?? "unknown";
};
