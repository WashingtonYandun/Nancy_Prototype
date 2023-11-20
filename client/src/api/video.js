import { nancy_apis, wy_apis } from "./axios";

export const getAllVideosRequest = async () => nancy_apis.get("/videos/all");

export const getVideoByUserRequest = async (id) =>
    nancy_apis.get(`/videos/user/${id}`);

export const getVideoByCategoryRequest = async (category) => {
    nancy_apis.get(`/videos/category/${category}`);
};

export const createVideoRequest = async (video) =>
    nancy_apis.post("/admin/videos", video);

export const updateVideoRequest = async (id, video) =>
    nancy_apis.put(`/admin/videos/${id}`, video);

export const deleteVideoRequest = async (id) =>
    nancy_apis.delete(`/admin/videos/${id}`);

export const getVideoRequest = async (id) => nancy_apis.get(`/videos/${id}`);
