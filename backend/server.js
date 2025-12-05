import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import todoRoutes from "./routes/todos.js";
import adminRoutes from "./routes/admin.js";
import { authMiddleware } from "./middleware/auth.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", authMiddleware, todoRoutes);
app.use("/api/admin", authMiddleware, adminRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
