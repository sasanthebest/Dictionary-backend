import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();
/**
 * Redis client instance
 */
export const redis = createClient({
  url:
    process.env.NODE_ENV === "development"
      ? process.env.REDIS_URL_DEVELOPMENT
      : process.env.REDIS_URL_PRODUCTION,
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

/**
 * Connect Redis once at startup
 */
export const connectRedis = async (mode: ServerMode) => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log(`Redis connected in ${mode} mode`);
  }
};
