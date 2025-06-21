import { Router } from 'express';
import multer from 'multer';
import { handleFileUpload } from '../controllers/uploadController';

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.post('/', upload.single('file'), handleFileUpload);

export default router;
