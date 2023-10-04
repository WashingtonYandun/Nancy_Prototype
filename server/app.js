import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { authRoutes } from "./routes/auth.routes.js";
import { notesRoutes } from "./routes/notes.routes.js";
import { FRONTEND_URL } from "./config.js";

// Create express app
const app = express();

// Enable CORS
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", notesRoutes);

export { app };
