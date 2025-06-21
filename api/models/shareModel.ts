import mongoose, { Schema, Document } from 'mongoose';

export interface IShare extends Document {
  data: string;         // could be Buffer if you want file support
  expiresAt: Date;
}

const ShareSchema: Schema = new Schema({
  data: { type: String, required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

ShareSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto delete expired docs

export default mongoose.model<IShare>('Share', ShareSchema);
