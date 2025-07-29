import { Router } from "express";
import { contactForm } from "../controllers/supportController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

const router = Router();

router.post("/contact-form", upload.array("attachments"), contactForm);

export default router;
