// routes/marketingRoutes.ts
import { Router } from "express";
import { subscribeMarketing } from "../controllers/marketingController";
import { authenticate } from "../middlewares/authenticate";

const router = Router();
router.post("/subscribe", authenticate, subscribeMarketing);

export default router;
