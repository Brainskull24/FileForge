import mongoose, { Document, Schema } from "mongoose";

// Address interface
interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: Address;
  profilePicture?: string;
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
  credits?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Address sub-schema
const addressSchema = new Schema<Address>(
  {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    postalCode: { type: String },
  },
  { _id: false }
);

// Main user schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    address: { type: addressSchema, required: false },
    profilePicture: { type: String },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    credits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>("User", userSchema);
