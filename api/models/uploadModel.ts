import mongoose from 'mongoose';

const uploadSchema = new mongoose.Schema({
  filename: String,
  path: String,
  mimetype: String,
  size: Number,
  createdAt: { type: Date, default: Date.now },
});

const Upload = mongoose.model('Upload', uploadSchema);
export default Upload;
