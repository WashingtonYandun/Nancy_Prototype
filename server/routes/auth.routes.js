import { Router } from "express";
import {
    login,
    register,
    logout,
    verifyToken,
} from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.get("/verify", verifyToken);

export { authRouter };
