import { Router } from "express";
import { auth, verifyRole } from "../middlewares/auth.middleware.js";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/users.controller.js";

const userManagementRoutes = Router();

userManagementRoutes.get("/users", auth, getUsers);
userManagementRoutes.get("/users/:id", auth, getUser);
userManagementRoutes.put("/users/:id", auth, updateUser);
userManagementRoutes.delete("/users/:id", auth, deleteUser);

export { userManagementRoutes };
