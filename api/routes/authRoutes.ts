import { Router } from "express";
import {
  register,
  login,
  logout,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
} from "../controllers/authController";
import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });
const router = Router();

router.post("/register", upload.single("profilePic"), register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
