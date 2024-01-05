import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import {createUserVideo} from "../controllers/videos/userVideo.controller.js";
import {createUserCourse} from "../controllers/course/userCourse.controller.js";


export const intercationRoutes = Router();

intercationRoutes.post(
    "/user-video/",
    // auth,
    createUserVideo
);

intercationRoutes.post(
    "/user-course/",
    // auth,
    createUserCourse
);

