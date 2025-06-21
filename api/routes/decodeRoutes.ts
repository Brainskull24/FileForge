import { Router } from 'express';
import { handleDecode } from '../controllers/decodeController';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

// Accept either file or inputText
router.post('/', upload.single('file'), handleDecode);

export default router;
