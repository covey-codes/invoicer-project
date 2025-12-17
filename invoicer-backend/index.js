import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true
  })
);app.use(express.json());

app.use("/api/auth", authRoutes);

console.log("MONGO_URI =", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch(err => console.error(err));

app.listen(8000, () =>
  console.log("Server running on port 8000")
);
