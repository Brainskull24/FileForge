import { Router } from "express";
import {
  getAccountDetails,
  updateAccountDetails,
  updatePassword,
  addCredits,
  deleteUserAvatar,
} from "../controllers/accountController";
import { authenticate } from "../middlewares/authenticate"; // ✅ import middleware
import multer from "multer";

const storage = multer.memoryStorage(); // or diskStorage
const upload = multer({ storage });
const router = Router();

// ✅ Protect all routes with `authenticate` middleware
router.get("/details", authenticate, getAccountDetails);
router.put("/update", upload.single("profilePic"), authenticate, updateAccountDetails);
router.delete("/user-avatar", authenticate, deleteUserAvatar);
router.put("/update-password", authenticate, updatePassword);
router.post("/credit", authenticate, addCredits);

export default router;
