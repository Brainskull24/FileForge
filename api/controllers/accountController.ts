import { Response } from "express";
import bcrypt from "bcryptjs";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middlewares/authenticate";

// 1. Get account details
export const getAccountDetails = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const userId = req.user?.id;
  const user = await UserModel.findById(userId).select(
    "-password -verificationToken -resetToken"
  );
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
};

// 2. Update account details
export const updateAccountDetails = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { name, phone, address, role } = req.body;
  const profilePic = req.file;

  let parsedAddress;
  if (typeof address === "string") {
    parsedAddress = JSON.parse(address);
  } else {
    parsedAddress = address;
  }

  let profilePicBase64: string | undefined = undefined;
  if (profilePic) {
    const base64 = profilePic.buffer.toString("base64");
    const mimeType = profilePic.mimetype;
    profilePicBase64 = `data:${mimeType};base64,${base64}`;
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user?.id,
    { name, phone, address: parsedAddress, profilePic: profilePicBase64, role },
    { new: true }
  );

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json({ message: "Account updated", user });
};

// 3. Update password
export const updatePassword = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: "Missing password fields" });
    return;
  }

  const user = await UserModel.findById(req.user?.id);
  if (!user || !user.password) {
    res.status(400).json({ error: "Invalid user or password" });
    return;
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    res.status(400).json({ error: "Incorrect current password" });
    return;
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ message: "Password updated successfully" });
};

// 4. Add credits to user
export const addCredits = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  const { credits } = req.body;
  const user = await UserModel.findById(req.user?.id);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  user.credits = (user.credits || 0) + credits;
  await user.save();

  res.json({ message: "Credits added", currentCredits: user.credits });
};

export const deleteUserAvatar = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.profilePic = undefined;
    await user.save();

    res.status(200).json({ message: "Avatar removed successfully." });
  } catch (error) {
    console.error("Error removing avatar:", error);
    res.status(500).json({ message: "Server error" });
  }
};
