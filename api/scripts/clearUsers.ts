import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import { UserModel } from "../models/userModel";

const clearUsers = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);

    const result = await UserModel.deleteMany({});
    console.log(`✅ Cleared ${result.deletedCount} users`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error("❌ Error clearing users:", err);
    process.exit(1);
  }
};

clearUsers();
