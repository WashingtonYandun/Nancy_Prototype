import { Video } from "../models/video.model.js";

export const getVideos = async (req, res) => {
    try {
        const videos = await Video.find({ uploaderId: req.user.id }).populate(
            "uploaderId"
        );
        res.json(videos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getVideoByCategory = async (req, res) => {
    try {
        const videos = await Video.find({
            classification: req.params.category,
        });
        res.json(videos);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createVideo = async (req, res) => {
    try {
        const { title, description, url, classification } = req.body;

        const uploaderId = req.user.id;
        const newVideo = new Video({
            title,
            description,
            url,
            uploaderId,
            classification,
        });

        await newVideo.save();
        res.json(newVideo);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteVideo = async (req, res) => {
    try {
        const deletedVideo = await Video.findByIdAndDelete(req.params.id);

        if (!deletedVideo) {
            return res.status(404).json({ message: "Video not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateVideo = async (req, res) => {
    try {
        const { title, description, url } = req.body;

        const videoUpdated = await Video.findOneAndUpdate(
            { _id: req.params.id },
            {
                title,
                description,
                url,
            },
            { new: true }
        );
        return res.json(videoUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getVideo = async (req, res) => {
    try {
        const video = await Video.findById(req.params.id);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        return res.json(video);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
