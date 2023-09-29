import express from "express";
import morgan from "morgan";
import { authRouter } from "./routes/auth.routes.js";

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use("/api", authRouter);

export { app };
