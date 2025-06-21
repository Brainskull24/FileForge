import { Router } from 'express';
import { getSharedContent, generateShareLink } from '../controllers/shareController';

const router = Router();

router.post('/', generateShareLink);
router.get('/:id', getSharedContent);

export default router;
