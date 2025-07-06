import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string; // mark as required
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  verificationToken: String,
  resetToken: String,
}, { timestamps: true });

export default mongoose.model<IUser>('User', userSchema);
