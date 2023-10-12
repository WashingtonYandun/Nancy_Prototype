import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

const authRoutes = Router();

authRoutes.post(
    "/register",
    validateSchema(registerSchema),
    AuthController.register
);
authRoutes.post("/login", validateSchema(loginSchema), AuthController.login);
authRoutes.get("/verify", AuthController.verifyToken);
authRoutes.post("/logout", AuthController.verifyToken, AuthController.logout);

export { authRoutes };
