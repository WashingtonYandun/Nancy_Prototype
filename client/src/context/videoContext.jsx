import { createContext, useContext, useState } from "react";
import {
    getAllVideosRequest,
    deleteVideoRequest,
    getVideoRequest,
    updateVideoRequest,
    createVideoRequest,
    getVideoByCategoryRequest,
    getVideoByUserRequest,
} from "../api/video";

const VideoContext = createContext();

export const useVideo = () => {
    const context = useContext(VideoContext);
    if (!context) {
        throw new Error("useVideo must be used within a VideoProvider");
    }

    return context;
};

export function VideoProvider({ children }) {
    const [videos, setVideos] = useState([]);

    const getVideos = async () => {
        const res = await getAllVideosRequest();
        setVideos(res.data);
    };

    const getVideoByCategory = async (category) => {
        const res = await getVideoByCategoryRequest(category);
        setVideos(res.data);
    };

    const getVideoByUser = async (id) => {
        const res = await getVideoByUserRequest(id);
        setVideos(res.data);
    };

    const deleteVideo = async (id) => {
        try {
            const res = await deleteVideoRequest(id);
            if (res.status === 204)
                setVideos(videos.filter((video) => video._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const getVideo = async (id) => {
        try {
            const res = await getVideoRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const createVideo = async (video) => {
        try {
            const res = await createVideoRequest(video);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const updateVideo = async (id, video) => {
        try {
            await updateVideoRequest(id, video);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <VideoContext.Provider
            value={{
                videos: videos,
                getVideos: getVideos,
                deleteVideo: deleteVideo,
                getVideo: getVideo,
                updateVideo: updateVideo,
                createVideo: createVideo,
                getVideoByCategory: getVideoByCategory,
                getVideoByUser: getVideoByUser,
            }}
        >
            {children}
        </VideoContext.Provider>
    );
}
