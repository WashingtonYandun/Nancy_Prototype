import mongoose from "mongoose";
import { expressionSchema } from "../expression/expression.model.js";

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
        expressions: [
            {
                type: expressionSchema,
                required: true,
            },
        ],

    },
    { timestamps: true }
);

export const UserCourseInteraction = mongoose.model("UserCourseInteraction", userCourseInteractionSchema);
