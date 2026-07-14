import express from "express";
import wordRoutes from "./modules/word/word.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { securityMiddleware } from "./middlewares/security";
import authRoutes from "./modules/auth/auth.routes";
import { rateLimiterMiddleware } from "./middlewares/rateLimiter.middleware";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

/* ---------------- middleware ---------------- */
app.use(
  cors({
    origin: "http://localhost:3000", // your frontend URL
    credentials: true, // 🔥 REQUIRED for cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());
app.use(cookieParser());

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
