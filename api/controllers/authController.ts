// authController.ts
import { Request, Response } from 'express';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt';
import { sendEmail } from '../utils/sendMail';
import crypto from 'crypto';
import { getVerificationEmailHtml, getResetPasswordEmailHtml } from '../utils/emailTemplates';

export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    res.status(400).json({ error: 'Email already in use' });
    return;
  }
  const hashed = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(20).toString('hex');
  const user = await User.create({ name, email, password: hashed, verificationToken: token });

  const verificationLink = `http://localhost:4000/api/v1/auth/verify-email?token=${token}`;
  const html = getVerificationEmailHtml(name, verificationLink);

  await sendEmail(email, 'Verify Email Address', html);
  res.status(201).json({ message: 'Registered. Please verify email.' });
};

export const verifyEmail = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query;
  const user = await User.findOne({ verificationToken: token });

  if (!user) {
    res.redirect('http://localhost:5173/verify-failed'); 
    return;
  }

  user.verified = true;
  user.verificationToken = '';
  await user.save();

  res.redirect('http://localhost:5173/verified'); 
};

export const resendVerification = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  if (user.verified) {
    res.status(400).json({ error: 'Already verified' });
    return;
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.verificationToken = token;
  await user.save();

  const verificationLink = `http://localhost:4000/api/v1/auth/verify-email?token=${token}`;
  const html = getVerificationEmailHtml(user.name || 'User', verificationLink);

  await sendEmail(email, 'Verify Email Address', html);
  res.json({ message: 'Verification email resent' });
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ error: 'Invalid credentials' });
    return;
  }
  if (!user.verified) {
    res.status(403).json({ error: 'Email not verified' });
    return;
  }
  const token = generateToken({ userId: user._id });
  res.json({ token });
};

export const logout = async (_req: Request, res: Response): Promise<void> => {
  res.json({ message: 'Logged out' });
};

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  const token = crypto.randomBytes(20).toString('hex');
  user.resetToken = token;
  await user.save();

  const resetLink = `http://localhost:4000/api/v1/auth/reset-password?token=${token}`;
  const html = getResetPasswordEmailHtml(resetLink);

  await sendEmail(email, 'Reset Your Password', html);
  res.json({ message: 'Reset link sent' });
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query;
  const { password } = req.body;
  const user = await User.findOne({ resetToken: token });
  if (!user) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = '';
  await user.save();
  res.json({ message: 'Password updated' });
};