import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/user';

const clearUsers = async () => {
  try {
    const uri = process.env.MONGODB_URI as string;
    await mongoose.connect(uri);
    const result = await User.deleteMany({});
    console.log(`✅ Cleared ${result.deletedCount} users`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error clearing users:', err);
    process.exit(1);
  }
};

clearUsers();
