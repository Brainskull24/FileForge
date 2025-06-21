import { Router } from 'express';
import { handleEncode } from '../controllers/encodeController';
import { upload } from '../middlewares/uploadMiddleware';

const router = Router();

router.post('/', upload.single('file'), handleEncode);

export default router;
