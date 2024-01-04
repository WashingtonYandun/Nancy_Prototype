import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { createCourse, deleteCourse, getCourse, getCourses, updateCourse, getVideosByCourseId } from "../controllers/course/courses.controller.js";


export const courseRoutes = Router();


courseRoutes.get(
    "/courses",
    auth,
    getCourses
);
courseRoutes.get(
    "/courses/:id",
    auth,
    getCourse
);
courseRoutes.put(
    "/courses/:id",
    auth,
    updateCourse
);
courseRoutes.delete(
    "/courses/:id",
    auth,
    deleteCourse
);
courseRoutes.post(
    "/courses",
    auth,
    createCourse
);
courseRoutes.get(
    "/courses/videos/:id",
    auth,
    getVideosByCourseId
)
