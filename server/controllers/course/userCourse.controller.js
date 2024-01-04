import {UserCourseInteraction} from "../../models/course/userCourseInteraction.model.js";
import {getExpressionPercentage, normalizeEmotionsData} from "../../libs/utils.emotions.js";

export const createUserCourse = async (req, res) => {
    try {
        const {
            userId,
            courseId,
            expressions,
        } = req.body;

        let averageEmptions = getExpressionPercentage(expressions);
        let normalizeEmotions = normalizeEmotionsData(averageEmptions);
        let nn_score = nn.feedforward(normalizeEmotions)

        let course = await Course.findById(courseId);

        const userCourse = new UserCourseInteraction({
            userId,
            courseId,
            expressions,
            score : nn_score,
            category: course.classification.category,
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