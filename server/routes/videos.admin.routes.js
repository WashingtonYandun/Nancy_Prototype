import { Router } from "express";
import { auth, verifyRole } from "../middlewares/auth.middleware.js";
import {
    getVideo,
    getAllVideos,
    getVideoByCategory,
    createVideo,
    deleteVideo,
    updateVideo,
    getVideos,
} from "../controllers/videos/videos.controller.js";

export const videosManagementRoutes = Router();

videosManagementRoutes.get("/videos/all", auth, getAllVideos);
videosManagementRoutes.get("/videos/user/:id", auth, getVideos);
videosManagementRoutes.get(
    "/videos/category/:category",
    auth,
    getVideoByCategory
);
videosManagementRoutes.get("/videos/:id", auth, getVideo);

videosManagementRoutes.post("/admin/videos", auth, verifyRole, createVideo);
videosManagementRoutes.put("/admin/videos/:id", auth, verifyRole, updateVideo);
videosManagementRoutes.delete(
    "/admin/videos/:id",
    auth,
    verifyRole,
    deleteVideo
);
