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

videosManagementRoutes.get("/videos/all", auth, getAllVideos);
videosManagementRoutes.get("/videos/user/:id", auth, getVideos);
videosManagementRoutes.get(
    "/videos/category/:category",
    auth,
    getVideoByCategory
);
videosManagementRoutes.get("/videos/:id", auth, getVideo);
videosManagementRoutes.post("/videos", auth, createVideo);
videosManagementRoutes.put("/videos/:id", auth, updateVideo);
videosManagementRoutes.delete("/videos/:id", auth, deleteVideo);

export { videosManagementRoutes };
