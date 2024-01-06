import { createContext, useContext, useState } from "react";
import {
    getCoursesRequest,
    deleteCourseRequest,
    createCourseRequest,
    getCourseRequest,
    updateCourseRequest,
    getVideosByCourseIdRequest,
    recommendedCoursesRequest,
} from "../api/courses";

const CourseContext = createContext();

export const useCourses = () => {
    const context = useContext(CourseContext);
    if (!context)
        throw new Error("useCourses must be used within a CourseProvider");
    return context;
};

export function CourseProvider({ children }) {
    const [courses, setCourses] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    const getCourses = async () => {
        try {
            const res = await getCoursesRequest();
            setCourses(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            const res = await deleteCourseRequest(id);
            if (res.status === 204)
                setCourses(courses.filter((course) => course._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createCourse = async (course) => {
        try {
            const res = await createCourseRequest(course);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getCourse = async (id) => {
        try {
            const res = await getCourseRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateCourse = async (id, course) => {
        try {
            const res = await updateCourseRequest(id, course);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const getVideosByCourseId = async (id) => {
        try {
            const res = await getVideosByCourseIdRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const getRecommendations = async (id) => {
        try {
            const res = await recommendedCoursesRequest(id);
            setRecommendations(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <CourseContext.Provider
            value={{
                courses: courses,
                getCourses: getCourses,
                deleteCourse: deleteCourse,
                createCourse: createCourse,
                getCourse: getCourse,
                updateCourse: updateCourse,
                getVideosByCourseId: getVideosByCourseId,
                recommendations: recommendations,
                getRecommendations: getRecommendations,
            }}
        >
            {children}
        </CourseContext.Provider>
    );
}
