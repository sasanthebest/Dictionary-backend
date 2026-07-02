import { createClient } from "redis";

/**
 * Redis client instance
 */
export const redis = createClient({
  url: "redis://localhost:6379",
});

redis.on("error", (err) => {
  console.error("Redis Error:", err);
});

/**
 * Connect Redis once at startup
 */
export const connectRedis = async () => {
  if (!redis.isOpen) {
    await redis.connect();
    console.log("Redis connected");
  }
};
