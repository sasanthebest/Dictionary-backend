import { RateLimiterRedis } from "rate-limiter-flexible";
import { redis } from "./redis";

export const redisRateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rl",
  points: 1000000, // max requests
  duration: 10, // 10 seconds
});
