import { Router } from "express";
import { auth, verifyRole } from "../middlewares/auth.middleware.js";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    makeAdmin,
} from "../controllers/users.controller.js";

export const userManagementRoutes = Router();

userManagementRoutes.get("/users", auth, verifyRole, getUsers);
userManagementRoutes.get("/users/:id", auth, verifyRole, getUser);
userManagementRoutes.put("/users/:id", auth, verifyRole, updateUser);
userManagementRoutes.delete("/users/:id", auth, verifyRole, deleteUser);
userManagementRoutes.put("/users/:id/make-admin", auth, verifyRole, makeAdmin);
