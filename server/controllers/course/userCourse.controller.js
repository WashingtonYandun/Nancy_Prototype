import { UserCourseInteraction } from "../../models/course/userCourseInteraction.model.js";
import { normalizeEmotionsData } from "../../libs/utils.emotions.js";
import { nn } from "../../ai/nn.js";
import { Course } from "../../models/course/course.model.js";

export const createUserCourse = async (req, res) => {
    try {
        const {
            userId,
            courseId,
            expressions,
        } = req.body;

        let normalizedExpressions = normalizeEmotionsData(expressions);
        let nn_score = nn.feedforward(normalizedExpressions)[0]
        let course = await Course.findById(courseId);

        const userCourse = new UserCourseInteraction({
            userId: userId,
            courseId: courseId,
            score: nn_score,
            category: course.classification.category,
        });

        await userCourse.save();

        res.status(201).json(userCourse);
    } catch (error) {
        return res.status(500).json(
            {
                message: error.message,
            }
        );
    }
}