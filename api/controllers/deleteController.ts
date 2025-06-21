import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import Upload from '../models/uploadModel';

export const deleteFile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const fileDoc = await Upload.findById(id);

    if (!fileDoc) {
      res.status(404).json({ error: 'File not found' });
      return;
    }

    if (fileDoc.filename) {
      const filePath = path.join(__dirname, '../../uploads', fileDoc.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error('File deletion error:', err);
      });
    }

    await Upload.findByIdAndDelete(id);
    res.status(200).json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
