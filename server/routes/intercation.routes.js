import { Router } from "express";
import { createUserVideo } from "../controllers/videos/userVideo.controller.js";
import { createUserCourse } from "../controllers/course/userCourse.controller.js";


export const intercationRoutes = Router();

intercationRoutes.post(
    "/uservideo",
    // auth,
    createUserVideo
);

intercationRoutes.post(
    "/usercourse",
    // auth,
    createUserCourse
);

