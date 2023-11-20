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
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createVideoSchema } from "../schemas/video.schema.js";

export const videosManagementRoutes = Router();

videosManagementRoutes.get("/videos/all", auth, getAllVideos);
videosManagementRoutes.get("/videos/user/:id", auth, getVideos);
videosManagementRoutes.get(
    "/videos/category/:category",
    auth,
    getVideoByCategory
);
videosManagementRoutes.get("/videos/:id", auth, getVideo);
videosManagementRoutes.post(
    "/videos",
    auth,
    verifyRole,
    validateSchema(createVideoSchema),
    createVideo
);
videosManagementRoutes.put("/videos/:id", auth, verifyRole, updateVideo);
videosManagementRoutes.delete("/videos/:id", auth, verifyRole, deleteVideo);
