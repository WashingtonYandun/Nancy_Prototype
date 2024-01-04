import {UserVideoInteraction} from "../../models/video/userVideoInteraction.model.js";

export const createUserVideo = async (req, res) => {
    try {
        const {
            userId,
            videoId,
            expressions,
        } = req.body;

        const userCourse = new UserVideoInteraction({
            userId,
            videoId,
            expressions
        });

        await userCourse.save();

        res.status(201).json(userCourse);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}