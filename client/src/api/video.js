import axios from "./axios";

export const getAllVideosRequest = async () => axios.get("/videos/all");

export const getVideoByUserRequest = async (id) =>
    axios.get(`/videos/user/${id}`);

export const getVideoByCategoryRequest = async (category) => {
    axios.get(`/videos/category/${category}`);
};

export const createVideoRequest = async (video) => axios.post("/videos", video);

export const updateVideoRequest = async (id, video) =>
    axios.put(`/videos/${id}`, video);

export const deleteVideoRequest = async (id) => axios.delete(`/videos/${id}`);

export const getVideoRequest = async (id) => axios.get(`/videos/${id}`);
