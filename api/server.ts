// Modules and Libraries
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import marketingRoutes from "./routes/marketingRoutes";
import accountRoutes from "./routes/accountRoutes";
import pdfRoutes from "./routes/pdfRoutes";
import conversionRoutes from "./routes/conversionRoutes";
import supportRoutes from "./routes/supportRoutes";
import logger from "./utils/logger";
import { fileQueue } from "./queues/fileQueue";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://fileforge-v1.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/marketing", marketingRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/file-conversion", conversionRoutes);
app.use("/api/v1/support", supportRoutes);

app.post("/process", async (req, res) => {
  const { fileName, operation } = req.body;

  const job = await fileQueue.add("convert-file", {
    fileName,
    operation,
  });

  res.json({ jobId: job.id, status: "queued" });
});

// Validate required environment variables
const requiredEnvVars = ["MONGODB_URI", "JWT_SECRET"];
const missingEnvVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingEnvVars.length > 0) {
  logger.error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
  process.exit(1);
}

const PORT = process.env.PORT || 4000;

// Health check endpoint
app.get("/health", (_req, res) => {
  res.json({ status: "healthy", service: "fileforge-api" });
});

// Graceful shutdown handler
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Starting graceful shutdown...`);
  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}`);
  });
});
