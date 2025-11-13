import { Router } from "express";
import axios from "axios";
import multer from "multer";
import FormData from "form-data";
import logger from "../utils/logger";

const router = Router();
const upload = multer();

router.post("/:operation", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ message: "File is required" });
      return;
    }

    const operation = req.params.operation;
    
    // Validate operation format
    if (!operation || !operation.includes("-to-")) {
      res.status(400).json({ message: "Invalid operation format. Expected format: 'source-to-target'" });
      return;
    }
    
    const resource = operation.split("-to-")[0];

    if (!resource) {
      res.status(400).json({ message: "Invalid operation format" });
      return;
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
    logger.error("Error calling Python server:", error);
    res.status(500).json({
      message: "Conversion failed",
      error: error.message,
    });
  }
});

// Note: Worker code removed as it's not currently being used for actual job processing
// If you need queue-based processing in the future, implement it properly with job creation
// and worker processing logic

export default router;
