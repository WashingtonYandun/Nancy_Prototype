import axios from "./axios";

export const getCoursesRequest = async () => axios.get("/courses");

export const createCourseRequest = async (course) => axios.post("/courses", course);

export const updateCourseRequest = async (id, course) => axios.put(`/courses/${id}`, course);

export const deleteCourseRequest = async (id) => axios.delete(`/courses/${id}`);

export const getCourseRequest = async (id) => axios.get(`/courses/${id}`);

export const getVideosByCourseIdRequest = async (id) => axios.get(`/courses/videos/${id}`);

export const courseRecommendationRequest = async (id) => axios.get(`/courses/recommendation/${id}`);