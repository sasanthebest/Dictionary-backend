import mongoose from "mongoose";
import { connectRedis } from "./config/redis";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

// console.log(process.env.MONGO_URL);

/**
 * Connect DB + start server
 */
const startDevelopmentServer = async () => {
  try {
    console.log("Starting Development Server");
    await mongoose.connect(process.env.MONGO_URL_DEVELOPMENT!);

    console.log("MongoDB connected in developme mode");

    await connectRedis("development");

    app.listen(PORT, () => {
      console.log(
        `Development Server running on port http://localhost:${PORT}`,
      );
    });
  } catch (err) {
    console.error("Failed to start development server:", err);
    process.exit(1);
  }
};

const startProductionServer = async () => {
  try {
    console.log("Starting Production Server");
    await mongoose.connect(process.env.MONGO_URL_PRODUCTION!);

    console.log("MongoDB connected in production mode");

    await connectRedis("production");

    app.listen(PORT, () => {
      console.log(`Production Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start production server:", err);
    process.exit(1);
  }
};

if (process.env.NODE_ENV! === "development") {
  startDevelopmentServer();
} else {
  startProductionServer();
}
