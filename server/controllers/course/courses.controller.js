import { Course } from "../../models/course/course.model.js";

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
            requirements,
            thumbnail,
            language,
            category,
            subcategory,
        } = req.body;

        const instructorId = req.user.id;

        const newCourse = new Course({
            title,
            description,
            requirements,
            thumbnail,
            language,
            category,
            subcategory,
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

/**
 * Update a course by id.
 * 
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the course is updated.
 */
export const updateCourse = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            thumbnail,
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
                language,
                category,
                subcategory,
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