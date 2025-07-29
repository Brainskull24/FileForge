import mongoose from "mongoose";
import logger from "../utils/logger";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    logger.error("❌ MONGODB URI is not defined in environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    logger.info("✅ MongoDB connected to:", mongoose.connection.name);
  } catch (error) {
    logger.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};
