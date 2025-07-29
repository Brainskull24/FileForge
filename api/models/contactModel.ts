import mongoose, { Schema, Document } from "mongoose";

interface IAttachment {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface IContactRequest extends Document {
  name: string;
  email: string;
  accountType: string;
  category: string;
  priority: string;
  subject: string;
  description: string;
  attachments: IAttachment[];
  createdAt: Date;
}

const AttachmentSchema: Schema = new Schema({
  originalname: { type: String, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
  buffer: { type: Buffer, required: true },
});

const ContactRequestSchema: Schema = new Schema<IContactRequest>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    accountType: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, required: true },
    subject: { type: String, required: true },
    description: { type: String, required: true },
    attachments: [AttachmentSchema],
    createdAt: { type: Date, default: Date.now },
  },
  { versionKey: false }
);

export const ContactModel = mongoose.model<IContactRequest>(
  "Contact",
  ContactRequestSchema
);
