import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

dotenv.config();

import authRoutes from "./routes/auth.js";
import feedbackRoutes from "./routes/feedback.js";
import adminRoutes from "./routes/admin.js";

const app = express();

const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:3000"];

if (process.env.SITE_ORIGIN) {
  allowedOrigins.push(process.env.SITE_ORIGIN);
}

app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
  }),
);
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many login attempts, try again later" },
});

const feedbackLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { msg: "Too many requests, try again later" },
});

app.use("/api/auth/login", loginLimiter);
app.use("/api/feedbacks", feedbackLimiter);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
