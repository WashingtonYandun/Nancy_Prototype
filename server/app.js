import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import { authRouter } from "./routes/auth.routes.js";
import { cornellNotesRouter } from "./routes/cornellNotes.routes.js";
import { FRONTEND_URL, NODE_ENV } from "./config.js";

const app = express();

// cors middleware
app.use(
    cors({
        credentials: true,
        origin: FRONTEND_URL,
    })
);

// middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRouter);
app.use("/api/notes", cornellNotesRouter);

// serve static files
if (NODE_ENV === "production") {
    const path = await import("path");
    app.use(express.static("client/dist"));

    app.get("*", (req, res) => {
        console.log(path.resolve("client", "dist", "index.html"));
        res.sendFile(path.resolve("client", "dist", "index.html"));
    });
}

export { app };
