import type { Request, Response } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { verifyRefreshToken, generateAccessToken } from "../../utils/jwt";
import { redis } from "../../config/redis";
export const register = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.register(email, password);

  res.status(201).json({
    success: true,
    ...result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);

  res.json({
    success: true,
    ...result,
  });
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token" });
    }

    const decoded = verifyRefreshToken(refreshToken) as { id: string };

    const newAccessToken = generateAccessToken(decoded.id);

    return res.json({
      success: true,
      accessToken: newAccessToken,
    });
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.body; // or from auth middleware

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "User ID required",
    });
  }

  // remove refresh token from redis
  await redis.del(`refresh:${userId}`);

  return res.json({
    success: true,
    message: "Logged out successfully",
  });
});
