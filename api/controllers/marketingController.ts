import { Request, Response } from "express";
import MarketingLead from "../models/marketingLead";
import { UserModel } from "../models/userModel";
import { AuthRequest } from "../middlewares/authenticate";

export const subscribeMarketing = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const user = await UserModel.findById(req.user?.id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const existing = await MarketingLead.find({ email: user.email });
    if (existing) {
      res.status(400).json({ error: "User already subscribed!" });
      return;
    }

    const entry = new MarketingLead({
      userId: user._id,
      email: user.email,
      name: user.name,
    });

    await entry.save();
    res.json({ message: "User subscribed to marketing" });
  } catch (error) {
    console.error("Marketing subscribe error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
