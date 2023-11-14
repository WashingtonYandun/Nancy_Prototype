import mongoose from "mongoose";
import { classificationSchema } from "./classification.model.js";

export const analysisSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true,
        },

        expressions: [
            {
                type: expressionSchema,
                required: true,
            },
        ],

        classification: {
            type: classificationSchema,
        },

        subclassification: {
            type: classificationSchema,
        },

        expressions_percentage: [
            {
                expression: {
                    type: String,
                    required: true,
                },
                percent: {
                    type: Number,
                    required: true,
                },
            },
        ],

        main_expression: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: [-1, 0, 1],
        },
    },
    { timestamps: true }
);
