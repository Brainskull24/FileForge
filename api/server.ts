import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes";
import marketingRoutes from "./routes/marketingRoutes";
import accountRoutes from "./routes/accountRoutes";
import pdfRoutes from "./routes/pdfRoutes"; 
import conversionRoutes from "./routes/conversionRoutes"
import { connectDB } from "./config/db";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/marketing", marketingRoutes);
app.use("/api/v1/account", accountRoutes);
app.use("/api/v1/pdf", pdfRoutes);
app.use("/api/v1/file-conversion", conversionRoutes);

const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
