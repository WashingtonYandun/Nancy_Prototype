import { Router } from "express";
import {
    login,
    logout,
    register,
    verifyToken,
} from "../controllers/auth/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


export const authRoutes = Router();


authRoutes.post(
    "/register",
    validateSchema(registerSchema),
    register
);
authRoutes.post(
    "/login",
    validateSchema(loginSchema),
    login
);
authRoutes.get(
    "/verify",
    verifyToken
);
authRoutes.post(
    "/logout",
    verifyToken,
    logout
);
