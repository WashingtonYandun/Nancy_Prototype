import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { deleteCourse, getCourse, getCourses, updateCourse } from "../controllers/course/courses.controller.js";


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
