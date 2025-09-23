import { Router } from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import { Worker } from "bullmq";
import IORedis from "ioredis";
import logger from "../utils/logger";

const connection = new IORedis("redis://localhost:6379", {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

const router = Router();
const upload = multer();

router.post("/:operation", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "File is required" });
    }

    const operation = req.params.operation;
    const resource = operation.split("-to-")[0];

    if (!resource) {
      res.status(400).json({ message: "Invalid operation format" });
    }

    // Prepare form data
    const formData = new FormData();
    formData.append("file", req.file?.buffer, req.file?.originalname);

    // Construct Python server URL
    const pythonUrl = `${process.env.PYTHON_SERVER_URL}/api/v1/file-conversion/${resource}?conversion=${encodeURIComponent(
      operation
    )}`;

    // Send file to Python backend
    const pythonResponse = await axios.post(pythonUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      responseType: "stream", // ensure we get raw file stream
    });

    // Forward headers for file download
    res.setHeader(
      "Content-Type",
      pythonResponse.headers["content-type"] || "application/octet-stream"
    );
    if (pythonResponse.headers["content-disposition"]) {
      res.setHeader(
        "Content-Disposition",
        pythonResponse.headers["content-disposition"]
      );
    } else {
      // Fallback filename
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="converted-${req.file?.originalname}"`
      );
    }

    // Pipe the file stream directly to the frontend response
    pythonResponse.data.pipe(res);
  } catch (error: any) {
    logger.error("Error calling Python server:", error.message);
    res.status(500).json({
      message: "Conversion failed",
      error: error.message,
    });
  }
});

const worker = new Worker(
  "file-queue",
  async (job) => {
    console.log("Processing job:", job.id, job.data);
    return { success: true, result: `Processed ${job.data.fileName}` };
  },
  { connection }
);

worker.on("completed", (job) => {
  console.log(`Job ${job.id} completed!`);
});

worker.on("failed", (job, err) => {
  console.error(`Job ${job?.id} failed:`, err);
});


export default router;
