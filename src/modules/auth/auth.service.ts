import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { redis } from "../../config/redis";

export const register = async (email: string, password: string) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new Error("User not found");

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id.toString());
  const refreshToken = generateRefreshToken(user._id.toString());

  await redis.set(`refresh:${user._id}`, refreshToken, {
    EX: 60 * 60 * 24 * 7,
  });

  return { user, accessToken, refreshToken };
};
