import mongoose, { Document, Schema } from "mongoose";

interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

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

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: Address;
  profilePic?: string;
  verified: boolean;
  verificationToken?: string;
  resetToken?: string;
  credits?: number;
  role?: string;
  provider?: string;
  providerId?: string;
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  createdVia?: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      // unique: true,
    },
    password: {
      type: String,
      required: function () {
        return this.createdVia === "custom";
      },
    },
    phone: { type: String },
    address: { type: addressSchema, required: false },
    profilePic: { type: String },
    verified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetToken: { type: String },
    credits: { type: Number, default: 500 },
    role: { type: String },
    provider: {
      type: String,
      enum: ["Google", "GitHub", null],
    },
    providerId: { type: String },
    createdVia: {
      type: String,
      required: true,
      enum: ["custom", "social"],
      default: "custom",
    },
    lastLogin: { type: Date },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
userSchema.index({ provider: 1, providerId: 1 });
export const UserModel = mongoose.model<IUser>("User", userSchema);
