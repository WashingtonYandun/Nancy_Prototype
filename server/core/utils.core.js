import { UserCourseInteraction } from "../models/course/userCourseInteraction.model"

let id = "659495489667382f7f18688c"

export const getUserCourseData = (userId) => {
    let courses = UserCourseInteraction.find({ userId: userId });

    let categories = ["Technology", "Science", "Software Development", "Business", "Art & Design", "Teaching & Academics", "Personal Development", "Health & Fitness", "Lifestyle"]

    let userCoursesMatrix = Array.from({ length: categories.length }, (_, index) => index + 1);

    console.log(userCoursesMatrix);

    // for (let i = 0; i < categories.length; i++) {
    //     let userCoursesData = [];

    //     for (let j = 0; j < userCourses.length; j++) {
    //         userCoursesData.push(userCourses[j].score);
    //     }

    //     userCoursesMatrix.push(userCoursesData);
    // }


}

get
