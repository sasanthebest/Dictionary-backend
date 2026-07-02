import express from "express";
import wordRoutes from "./modules/word/word.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { securityMiddleware } from "./middlewares/security";
import authRoutes from "./modules/auth/auth.routes";
import { rateLimiterMiddleware } from "./middlewares/rateLimiter.middleware";
const app = express();

/* ---------------- middleware ---------------- */
app.use(express.json());

/**
 * 🔒 Apply rate limiting to ALL routes
 */
if (process.env.NODE_ENV === "production") {
  app.use(rateLimiterMiddleware);
}

/* ---------------- routes ---------------- */
app.use("/api/words", wordRoutes);
app.use("/api/auth", authRoutes);

/* ---------------- error handler (last) ---------------- */
app.use(errorHandler);

securityMiddleware.forEach((mw) => app.use(mw));

export default app;
