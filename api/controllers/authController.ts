import { Request, Response } from "express";
import { UserModel } from "../models/userModel";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/jwt";
import { sendEmail } from "../utils/sendMail";
import {
  getVerificationEmailHtml,
  getResetPasswordEmailHtml,
} from "../utils/emailTemplates";

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, phone, address } = req.body;
  const file = req.file;

  let parsedAddress;
  if (typeof address === "string") {
    parsedAddress = JSON.parse(address);
  } else {
    parsedAddress = address;
  }

  const existing = await UserModel.findOne({ email });
  if (existing) {
    res.status(400).json({ error: "Email already in use" });
    return;
  }

  const hashed = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(20).toString("hex");

  // 🧠 Convert file to base64 string
  let profilePicBase64: string | undefined = undefined;
  if (file) {
    const base64 = file.buffer.toString("base64");
    const mimeType = file.mimetype;
    profilePicBase64 = `data:${mimeType};base64,${base64}`;
  }

  const user = new UserModel({
    email,
    password: hashed,
    name,
    phone,
    address: parsedAddress,
    profilePic: profilePicBase64,
    verificationToken: token,
  });

  const verificationLink = `http://localhost:4000/api/v1/auth/verify-email?token=${token}`;
  const html = getVerificationEmailHtml(name || "User", verificationLink);

  await sendEmail(email, "Verify Email Address", html);
  await user.save();

  res.status(201).json({ message: "Registered. Please verify email." });
};

export const verifyEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;
  const user = await UserModel.findOne({ verificationToken: token });

  if (!user) {
    // Return JSON instead of redirect if CLI/curl
    const acceptHeader = req.headers["accept"];
    if (acceptHeader && acceptHeader.includes("application/json")) {
      res.status(404).json({ error: "Invalid or expired token" });
      return;
    }

    res.redirect("http://localhost:5173/verify-failed");
    return;
  }

  user.verified = true;
  user.verificationToken = "";
  await user.save();

  const acceptHeader = req.headers["accept"];
  if (acceptHeader && acceptHeader.includes("application/json")) {
    res.cookie("email_verified", "false", {
      maxAge: 1000 * 60,
      httpOnly: false,
    });
    res.json({ message: "Email verified successfully", email: user.email });
    return;
  }

  res.cookie("email_verified", "true", {
    maxAge: 1000 * 60,
    httpOnly: false,
  });
  res.redirect("http://localhost:5173/verified");
};

export const resendVerification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  if (user.verified) {
    res.status(400).json({ error: "Already verified" });
    return;
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.verificationToken = token;
  await user.save();

  const verificationLink = `http://localhost:4000/api/v1/auth/verify-email?token=${token}`;
  const html = getVerificationEmailHtml(user.name || "User", verificationLink);

  await sendEmail(email, "Verify Email Address", html);
  res.json({ message: "Verification email resent" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email }).lean();

  if (
    !user ||
    !user.password ||
    !(await bcrypt.compare(password, user.password))
  ) {
    res.status(400).json({ error: "Invalid credentials" });
    return;
  }

  if (!user.verified) {
    res.status(403).json({ error: "Email not verified" });
    return;
  }

  const token = generateToken({ userId: user._id });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  await UserModel.findByIdAndUpdate(user._id, { lastLogin: new Date() });

  res.json({
    success: true,
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
      profilePic: user.profilePic || null,
      phone: user.phone || "",
      address: user.address || {},
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      verified: user.verified,
    },
  });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const token = crypto.randomBytes(20).toString("hex");
  user.resetToken = token;
  await user.save();

  const resetLink = `http://localhost:5173/reset-password?token=${token}`;
  const html = getResetPasswordEmailHtml(resetLink);

  await sendEmail(email, "Reset Your Password", html);
  res.json({ message: "Reset link sent" });
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { token } = req.query;
  const { password } = req.body;
  const user = await UserModel.findOne({ resetToken: token });

  if (!user) {
    res.status(400).json({ error: "Invalid token" });
    return;
  }

  user.password = await bcrypt.hash(password, 10);
  user.resetToken = "";
  await user.save();

  res.json({ message: "Password updated" });
};
