import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "../models/userModel";
import logger from "../utils/logger";

const clearUsers = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);

    const result = await UserModel.deleteMany({});
    logger.info(`✅ Cleared ${result.deletedCount} users`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    logger.error("❌ Error clearing users:", err);
    process.exit(1);
  }
};

clearUsers();
