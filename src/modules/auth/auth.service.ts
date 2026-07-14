import bcrypt from "bcryptjs";
import User from "../../models/user.model";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import { redis } from "../../config/redis";
import { AUTHENTICATION_MAX_AGE } from "../../settings";

console.log(AUTHENTICATION_MAX_AGE);

export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ name, email, password: hashed });

  const accessToken = generateAccessToken(user._id.toString(), name, email);
  const refreshToken = generateRefreshToken(user._id.toString(), name, email);

  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  // Only select fields needed for authentication and response
  const user = await User.findOne({ email }).select("name email password _id");

  if (!user) throw new Error("User not found");

  const { name, email: userEmail } = user;

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Invalid credentials");

  const accessToken = generateAccessToken(user._id.toString(), name, email);
  const refreshToken = generateRefreshToken(user._id.toString(), name, email);

  await redis.set(`refresh:${user._id}`, refreshToken, {
    PX: AUTHENTICATION_MAX_AGE,
  });

  // Return only public user data
  return {
    user: { name, email: userEmail },
    accessToken,
    refreshToken,
  };
};
