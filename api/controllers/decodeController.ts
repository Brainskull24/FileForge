import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import base32 from 'base32.js';

export const handleDecode = async (req: Request, res: Response): Promise<void> => {
  try {
    const { encoding, inputText } = req.body;
    let result: string | Buffer;

    if (!encoding || (!inputText && !req.file)) {
      res.status(400).json({ error: 'Encoding type and input are required' });
      return;
    }

    // Handle text input
    if (inputText) {
      switch (encoding) {
        case 'base64':
          result = Buffer.from(inputText, 'base64').toString('utf-8');
          break;
        case 'hex':
          result = Buffer.from(inputText, 'hex').toString('utf-8');
          break;
        case 'base32':
          const decoder = new base32.Decoder();
          result = Buffer.from(decoder.write(inputText).final()).toString('utf-8');
          break;
        default:
          res.status(400).json({ error: 'Unsupported encoding type' });
          return;
      }

      res.json({ status: 'success', decoded: result });
    }

    // Handle file input
    else if (req.file) {
      const buffer = fs.readFileSync(req.file.path);

      switch (encoding) {
        case 'base64':
          result = Buffer.from(buffer.toString(), 'base64');
          break;
        case 'hex':
          result = Buffer.from(buffer.toString(), 'hex');
          break;
        case 'base32':
          const decoder = new base32.Decoder();
          result = Buffer.from(decoder.write(buffer.toString()).final());
          break;
        default:
          res.status(400).json({ error: 'Unsupported encoding type' });
          return;
      }

      res.setHeader('Content-Disposition', 'attachment; filename=decoded-output');
      res.send(result);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to decode' });
  }
};
