import { Router } from 'express';
import { deleteFile } from '../controllers/deleteController';

const router = Router();

router.delete('/:id', deleteFile);

export default router;
