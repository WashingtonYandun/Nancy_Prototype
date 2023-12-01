import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { FRONTEND_URL } from "./config.js";
import { authRoutes } from "./routes/auth.routes.js";
import { notesRoutes } from "./routes/notes.routes.js";
import { userManagementRoutes } from "./routes/users.admin.routes.js";
import { videosManagementRoutes } from "./routes/videos.admin.routes.js";

// Create express app
export const app = express();

// Enable CORS
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).send("Something went wrong!");
});

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Routes user
app.use("/api/auth", authRoutes);
app.use("/api", notesRoutes);

// Routes admin
app.use("/api/admin", userManagementRoutes);
app.use("/api", videosManagementRoutes);
