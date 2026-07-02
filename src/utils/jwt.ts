import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const REFRESH_SECRET = process.env.REFRESH_SECRET || "refresh-secret";

/**
 * Access token (short-lived)
 */
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ id: userId }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

/**
 * Refresh token (long-lived)
 */
export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
