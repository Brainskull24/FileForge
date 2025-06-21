// import { Request, Response } from 'express';

// export const handleUpload = (req: Request, res: Response): void => {
//   if (!req.file) {
//     res.status(400).json({ error: 'No file uploaded' });
//     return;
//   }

//   res.json({
//     status: 'success',
//     filename: req.file.filename,
//     originalName: req.file.originalname,
//     path: req.file.path,
//   });
// };
import { Request, Response } from 'express';
import Upload from '../models/uploadModel';

export const handleFileUpload = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    // Save file metadata to MongoDB
    const newFile = new Upload({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size,
    });

    const savedFile = await newFile.save();

    res.status(200).json({
      message: 'File uploaded successfully',
      fileId: savedFile._id,  // This ID is what you'll use in delete
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
