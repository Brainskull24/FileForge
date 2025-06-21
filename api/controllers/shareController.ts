import { Request, Response } from 'express';
import shareModel from '../models/shareModel';

const BASE_URL = 'http://localhost:4000/api/share';

export const generateShareLink = async (req: Request, res: Response): Promise<void> => {
  const { encodedData, expiry } = req.body;

  if (!encodedData || !expiry) {
    res.status(400).json({ error: 'encodedData and expiry are required' });
    return;
  }

  const expiresAt = new Date(Date.now() + expiry * 1000); // expiry in seconds

  const doc = await shareModel.create({
    data: encodedData,
    expiresAt,
  });

  res.json({
    link: `${BASE_URL}/${doc._id}`,
    expiresAt: expiresAt.toISOString()
  });
};

export const getSharedContent = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const share = await shareModel.findById(id);
    if (!share) {
      res.status(404).json({ error: 'Link not found' });
      return;
    }

    if (new Date() > share.expiresAt) {
      res.status(410).json({ error: 'Link has expired' });
      return;
    }

    res.status(200).json({ originalData: share.data });
  } catch (err) {
    console.error('Error fetching shared content:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
