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
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

const allowedOrigins = [
  "https://fileforge-v1.vercel.app",
  "http://localhost:5173"
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

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running at http://localhost:${PORT}`);
  });
});
