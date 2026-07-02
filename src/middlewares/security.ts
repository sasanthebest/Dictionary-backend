import helmet from "helmet";
import cors from "cors";

/**
 * Basic API security setup
 */
export const securityMiddleware = [
  helmet(),
  cors({
    origin: "*", // later restrict this in production
    credentials: true,
  }),
];
