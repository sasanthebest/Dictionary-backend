import mongoose from "mongoose";
import { connectRedis } from "./config/redis";
import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Connect DB + start server
 */
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);

    console.log("MongoDB connected");

    await connectRedis();

    app.listen(PORT, () => {
      console.log(`Server running on port http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
