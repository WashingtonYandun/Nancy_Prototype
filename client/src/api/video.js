import axios from "./axios";

export const getVideosRequest = async () => axios.get("/videos");

export const createVideoRequest = async (video) => axios.post("/videos", video);

export const updateVideoRequest = async (id, video) =>
    axios.put(`/videos/${id}`, video);

export const deleteVideoRequest = async (id) => axios.delete(`/videos/${id}`);

export const getVideoRequest = async (id) => axios.get(`/videos/${id}`);
