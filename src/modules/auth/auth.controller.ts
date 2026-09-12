import type { Request, Response } from "express";
import * as authService from "./auth.service";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { verifyRefreshToken, generateAccessToken } from "../../utils/jwt";
import { redis } from "../../config/redis";
import { User } from "../../models/user.model";
import { AUTHENTICATION_MAX_AGE } from "../../settings";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password }: User = req.body;

  const result = await authService.register(name, email, password);

  res.status(201).json({
    success: true,
    ...result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const result = await authService.login(email, password);
  // console.log(result);
  // set access token in httpOnly cookie
  res.cookie("access_token", result.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTHENTICATION_MAX_AGE,
  });

  // set refresh token in httpOnly cookie
  res.cookie("refresh_token", result.refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: AUTHENTICATION_MAX_AGE,
  });

  return res.json({
    success: true,
    user: result.user, // optional but recommended
  });
});

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    // console.log("REFRESH CALLED", new Date().toISOString());

    const token = req.cookies?.refresh_token;

    // console.log("refresh cookie:", token);

    const decoded = verifyRefreshToken(token);
    const { id, name, email } = decoded;
    const newAccessToken = generateAccessToken(id, name, email);

    // console.log("NEW ACCESS TOKEN:", newAccessToken);

    res.cookie("access_token", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: AUTHENTICATION_MAX_AGE,
    });
    return res.json({
      success: true,
    });
  },
);

export const logout = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required",
      });
    }

    try {
      // invalidate refresh token
      await redis.del(`refresh:${userId}`);
    } catch (redisError) {
      console.error("Redis logout error:", redisError);

      // continue logout
    }

    // always remove cookies
    res.clearCookie("refresh_token");
    res.clearCookie("access_token");

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);

    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const me = async (req: Request, res: Response) => {
  return res.json({
    success: true,
    user: req.user,
  });
};
