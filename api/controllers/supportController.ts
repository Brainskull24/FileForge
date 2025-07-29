import { Request, Response } from "express";
import { ContactModel } from "../models/contactModel";
import logger from "../utils/logger";

export const contactForm = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      accountType,
      category,
      priority,
      subject,
      description,
    } = req.body;

    const attachments = (req.files as Express.Multer.File[]) || [];

    // Prepare attachments to store in DB (including file buffer)
    const attachmentDocs = attachments.map((file) => ({
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer,
    }));

    const newContact = new ContactModel({
      name,
      email,
      accountType,
      category,
      priority,
      subject,
      description,
      attachments: attachmentDocs,
    });

    await newContact.save();

    res.status(201).json({
      success: true,
      message: "Support request submitted and saved to database.",
      data: {
        ticketId: newContact._id,
      },
    });
  } catch (error) {
    logger.error("Error saving contact form:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while saving support request.",
    });
  }
};
