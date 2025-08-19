import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "mern-shop", time: new Date().toISOString() });
});

// TODO: app.use("/api/auth", authRoutes)
// TODO: app.use("/api/products", productRoutes)
// TODO: app.use("/api/orders", orderRoutes)

const PORT = process.env.PORT || 8080;

(async () => {
  await connectDB(process.env.MONGO_URI || "mongodb://127.0.0.1:27017");
  app.listen(PORT, () => console.log(`🚀 API http://localhost:${PORT}`));
})();

app.use("/api/auth", authRoutes);
