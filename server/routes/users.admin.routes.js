import { Router } from "express";
import { auth, verifyRole } from "../middlewares/auth.middleware.js";
import {
    getUsers,
    getUser,
    updateUser,
    deleteUser,
} from "../controllers/users.controller.js";

const userManagmentRoutes = Router();

userManagmentRoutes.get("/users", auth, getUsers);
userManagmentRoutes.get("/users/:id", auth, getUser);
userManagmentRoutes.put("/users/:id", auth, updateUser);
userManagmentRoutes.delete("/users/:id", auth, deleteUser);

export { userManagmentRoutes };
