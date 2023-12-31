import { Course } from "../../models/course/course.model.js";
import { Video } from "../../models/video/video.model.js";
import { recommendCourses } from "../../core/utils.core.js";

/**
 * Create a new course.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the course is created.
 */
export const createCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            thumbnail,
            language,
            classification,
            subclassification,
            tags,
            videos,
            requirements,
        } = req.body;

        const instructorId = req.user.id;

        const newCourse = new Course({
            title,
            description,
            thumbnail,
            language,
            classification,
            subclassification,
            tags,
            videos,
            requirements,
            instructorId: instructorId,
        });

        await newCourse.save();
        res.json(newCourse);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
};

/**
 * Get all courses.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the courses are retrieved.
 */
export const getCourses = async (req, res) => {
    try {
        const courses = await Course.find()

        res.json(courses);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }

}

/**
 * Get a course by id.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the course is retrieved.
 */
export const getCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        res.json(course);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}

/**
 * Delete a course by id.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the course is deleted.
 */
export const deleteCourse = async (req, res) => {
    try {
        const deletedCourse = await Course.findByIdAndDelete(req.params.id);

        if (!deletedCourse) {
            return res.status(404).json(
                {
                    message: "Course not found"
                }
            );
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}

export const updateCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            thumbnail,
            tags,
            videos,
            language,
            category,
            subcategory,
        } = req.body;

        const courseUpdated = await Course.findOneAndUpdate(
            { _id: req.params.id },
            {
                title,
                description,
                requirements,
                thumbnail,
                tags,
                language,
                category,
                subcategory,
                videos,
            },
            { new: true }
        );

        if (!courseUpdated) {
            return res.status(404).json(
                {
                    message: "Course not found"
                }
            );
        }

        res.json(courseUpdated);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}

/**
 * Add a video to a course.
 *
 * This function receives a request and a response object. It extracts the video from the request body.
 * It then updates the course with the provided id in the request parameters by pushing the new video into the videos array of the course.
 * If the course is not found, it responds with a 404 status code and a message "Course not found".
 * If the course is updated successfully, it responds with the updated course.
 * If an error occurs during the process, it responds with a 500 status code and the error message.
 *
 * @param {Object} req - The request object. The request body should contain a 'video' property.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the video is added to the course.
 * @throws {Error} - An error.
 */
export const addExistingVideo = async (req, res) => {
    try {
        const { videoId } = req.body;

        const video = Video.findById(videoId);

        if (!video) {
            return res.status(404).json(
                {
                    message: "Video not found"
                }
            );
        }

        const courseUpdated = await Course.findOneAndUpdate(
            { _id: req.params.id },
            {
                $push: {
                    videos: video
                }
            },
            { new: true }
        );

        if (!courseUpdated) {
            return res.status(404).json(
                {
                    message: "Course not found"
                }
            );
        }

        res.json(courseUpdated);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}


export const addNewVideo = async (req, res) => {
    try {
        const {
            title,
            description,
            url,
        } = req.body;

        const newVideo = new Video({
            title,
            description,
            url,
        });

        await newVideo.save();


        if (!courseUpdated) {
            return res.status(404).json(
                {
                    message: "Course not found"
                }
            );
        }

        res.json(courseUpdated);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}

export const getVideosByCourseId = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json(
                {
                    message: "Course not found"
                }
            );
        }

        const videos = await Video.find({ _id: { $in: course.videos } });

        res.json(videos);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}


/**
 * Handles the course recommendation request.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the recommendation is sent.
 */
export const courseRecommendation = async (req, res) => {
    try {
        const userId = req.user.id;
        let recommendedCourses = await recommendCourses(userId);

        if (recommendedCourses.length === 0) {
            return res.status(404).json(
                []
            );
        }

        recommendedCourses.forEach((course) => {
            course.recommendation_count += 1;
            console.log(course.recommendation_count)
            course.save();
        });

        res.json(recommendedCourses);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}

export const mostRecommendedCourses = async (req, res) => {
    try {
        const courses = await Course.find().sort({ recommendation_count: -1 }).limit(5);

        if (!courses) {
            return res.status(404).json(
                []
            );
        }
        res.json(courses);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message
            }
        );
    }
}