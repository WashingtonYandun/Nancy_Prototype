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
} from "../controllers/videos.controller.js";

const videosManagementRoutes = Router();

videosManagementRoutes.get("/videos/all", auth, verifyRole, getAllVideos);
videosManagementRoutes.get("/videos/user/:id", auth, verifyRole, getVideos);
videosManagementRoutes.get(
    "/videos/category/:category",
    auth,
    verifyRole,
    getVideoByCategory
);
videosManagementRoutes.get("/videos/:id", auth, verifyRole, getVideo);
videosManagementRoutes.post("/videos", auth, verifyRole, createVideo);
videosManagementRoutes.put("/videos/:id", auth, verifyRole, updateVideo);
videosManagementRoutes.delete("/videos/:id", auth, verifyRole, deleteVideo);

export { videosManagementRoutes };
