import { Router } from "express";
import {
  getAccountDetails,
  updateAccountDetails,
  updatePassword,
  addCredits,
  deleteUserAvatar,
  updateCredits
} from "../controllers/accountController";
import { authenticate } from "../middlewares/authenticate";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

router.get("/details", authenticate, getAccountDetails);
router.put("/update", upload.single("profilePic"), authenticate, updateAccountDetails);
router.delete("/user-avatar", authenticate, deleteUserAvatar);
router.put("/update-password", authenticate, updatePassword);
router.post("/credit", authenticate, addCredits);
router.put("/credit", authenticate, updateCredits);

export default router;
