import { UserCourseInteraction } from "../models/course/userCourseInteraction.model.js";
import { Course } from "../models/course/course.model.js";

/**
 * Recommends courses based on the user's viewing history and category scores.
 * 
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise that resolves to an array of recommended courses.
 * @throws {Error} - If an error occurs while fetching or processing the data.
 */
export const recommendCourses = async (userId) => {
    try {
        // get all the courses the user has viewed
        const viewedCourses = await UserCourseInteraction.find({ userId: userId })

        const categories = [
            "Technology",
            "Science",
            "Software Development",
            "Business",
            "Art & Design",
            "Teaching & Academics",
            "Personal Development",
            "Health & Fitness",
            "Lifestyle"
        ]
        const userCoursesMatrix = [];
        const rows = viewedCourses.length;
        const cols = categories.length;

        // get all the courses the user has not viewed
        const notViewedCourses = await Course.find({ _id: { $nin: viewedCourses.map((course) => course.courseId) } });


        for (let i = 0; i < rows; i++) {
            userCoursesMatrix[i] = [];
            for (let j = 0; j < cols; j++) {
                userCoursesMatrix[i][j] = viewedCourses[i].category === categories[j] ? viewedCourses[i].score : 0;
            }
        }

        // get the sum of each column
        const columnSums = [];
        for (let i = 0; i < cols; i++) {
            columnSums[i] = 0;
            for (let j = 0; j < rows; j++) {
                columnSums[i] += userCoursesMatrix[j][i];
            }
        }

        // get the average score for each category
        const categoryAverageScores = [];
        for (let i = 0; i < cols; i++) {
            categoryAverageScores[i] = columnSums[i] / rows;
        }

        // get the score for each course
        const coursesScores = [];
        for (let i = 0; i < notViewedCourses.length; i++) {
            coursesScores[i] = 0;
            for (let j = 0; j < cols; j++) {
                coursesScores[i] += notViewedCourses[i].classification.category === categories[j] ? categoryAverageScores[j] : 0;
            }
        }

        // get the top 100 courses with the highest score without repetition 
        const topCourses = [];
        let maxScore = 0;
        let maxScoreIndex = 0;
        for (let i = 0; i < 100; i++) {
            for (let j = 0; j < coursesScores.length; j++) {
                if (coursesScores[j] > maxScore) {
                    maxScore = coursesScores[j];
                    maxScoreIndex = j;
                }
            }
            topCourses.push(notViewedCourses[maxScoreIndex]);
            coursesScores[maxScoreIndex] = 0;
            maxScore = 0;
        }

        // remove duplicate courses
        const uniqueCourses = Array.from(new Set(topCourses.map(course => course._id.toString())))
            .map(courseId => topCourses.find(course => course._id.toString() === courseId));


        return uniqueCourses;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

/**
 * Calculates the analysis of recommendations based on the provided recommended courses.
 * @param {Array} recommendedCourses - The array of recommended courses.
 * @returns {Object} - The analysis data containing the category with the highest affinity percentage.
 * @throws {Error} - If an error occurs during the analysis.
 */
export const analysisOfRecomendations = (recommendedCourses) => {
    try {
        const categoryWithMoreAffinity = recommendedCourses[0].classification.category;
        let percentageOfAffinity = 0;

        recommendedCourses.forEach((course) => {
            if (course.classification.category === categoryWithMoreAffinity) {
                percentageOfAffinity += 1;
            }
        });

        percentageOfAffinity = (percentageOfAffinity / recommendedCourses.length);

        let data = {
            categoryWithMoreAffinity: percentageOfAffinity
        }

        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
}

