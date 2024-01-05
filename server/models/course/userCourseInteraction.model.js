import mongoose from "mongoose";

const userCourseInteractionSchema = new mongoose.Schema(
    {
        userId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        courseId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
                required: true
            }
        ],
        score: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const UserCourseInteraction = mongoose.model("UserCourseInteraction", userCourseInteractionSchema);