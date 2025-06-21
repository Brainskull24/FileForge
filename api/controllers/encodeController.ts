import { Request, Response } from 'express';
import fs from 'fs';
import base32 from 'base32.js';

export const handleEncode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { type, text } = req.body;
    let encoded: string;

    if (req.file) {
      const fileBuffer = fs.readFileSync(req.file.path);

      switch (type) {
        case 'base64':
          encoded = fileBuffer.toString('base64');
          break;
        case 'hex':
          encoded = fileBuffer.toString('hex');
          break;
        case 'base32':
          encoded = new base32.Encoder().write(fileBuffer).finalize();
          break;
        default:
          res.status(400).json({ error: 'Unsupported encoding type' });
          return;
      }

    } else if (text) {
      const buffer = Buffer.from(text);

      switch (type) {
        case 'base64':
          encoded = buffer.toString('base64');
          break;
        case 'hex':
          encoded = buffer.toString('hex');
          break;
        case 'base32':
          encoded = new base32.Encoder().write(buffer).finalize();
          break;
        default:
          res.status(400).json({ error: 'Unsupported encoding type' });
          return;
      }

    } else {
      res.status(400).json({ error: 'No input provided' });
      return;
    }

    res.json({ encoded });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
