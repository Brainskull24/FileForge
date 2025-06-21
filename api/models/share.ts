import mongoose from 'mongoose';

const ShareSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  }
}, { timestamps: true });

ShareSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // auto delete expired docs

export const Share = mongoose.model('Share', ShareSchema);
