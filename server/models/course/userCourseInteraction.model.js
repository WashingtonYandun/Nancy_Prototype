import mongoose from "mongoose";

const userCourseInteractionSchema = new mongoose.Schema(
    {
        userId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
        ,
        courseId:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
        }
        ,
        score: {
            type: Number,
        },
        category: {
            type: String,
        },
    },
    { timestamps: true }
);

export const UserCourseInteraction = mongoose.model("UserCourseInteraction", userCourseInteractionSchema);