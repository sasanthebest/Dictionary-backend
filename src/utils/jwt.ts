import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWTDecoded } from "../modules/auth/auth.types";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;

/**
 * Access token (short-lived)
 */
export const generateAccessToken = (
  userId: string,
  name: string,
  email: string,
) => {
  return jwt.sign({ id: userId, name, email }, JWT_SECRET, {
    expiresIn: "30d",
  });
};

/**
 * Refresh token (long-lived)
 */
export const generateRefreshToken = (
  userId: string,
  name: string,
  email: string,
) => {
  return jwt.sign({ id: userId, name, email }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET) as JWTDecoded;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET) as JWTDecoded;
};
