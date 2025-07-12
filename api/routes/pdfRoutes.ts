import { Router } from "express";
import { mergePDFs } from "../controllers/pdfController";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("/merge", upload.array("files", 10), mergePDFs);

export default router;
