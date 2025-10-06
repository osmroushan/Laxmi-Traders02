import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

// ✅ CORS setup for Vercel frontend
app.use(cors({
  origin: "https://laxmi-traders02-7jz5.vercel.app", // apna Vercel URL yahan
  methods: ["GET", "POST"],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("MongoDB error", err));

// ✅ Routes
import formRouter from "./routes/formRoutes.js";
app.use("/api/form", formRouter);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
