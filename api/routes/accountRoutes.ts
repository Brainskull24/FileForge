import { Router } from "express";
import {
  getAccountDetails,
  updateAccountDetails,
  updatePassword,
  addCredits,
} from "../controllers/accountController";
import { authenticate } from "../middlewares/authenticate"; // ✅ import middleware

const router = Router();

// ✅ Protect all routes with `authenticate` middleware
router.get("/details", authenticate, getAccountDetails);
router.put("/update", authenticate, updateAccountDetails);
router.put("/update-password", authenticate, updatePassword);
router.post("/credit", authenticate, addCredits);

export default router;
