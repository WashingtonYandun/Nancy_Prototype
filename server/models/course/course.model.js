import mongoose from "mongoose";
import { classificationSchema } from "../note/note.model.js";

const courseSchema = new mongoose.Schema(
    {
        instructorId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            }
        ],
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video',
                required: true
            }
        ],
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [6, "Title must be at least 6 characters long"],
            maxlength: [100, "Title must be at most 100 characters long"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [6, "Description must be at least 6 characters long"],
        },
        thumbnail: {
            type: String,
            minlength: [6, "Thumbnail must be at least 6 characters long"],
            trim: true,
        },
        category: {
            type: classificationSchema,
            required: true,
        },
        subcategory: {
            type: classificationSchema,
        },
        stars: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5,
                },
            },
        ],
        reactions: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                reaction: {
                    type: String,
                    required: true,
                    trim: true,
                    enum: ["angry",
                        "disgusted",
                        "fearful",
                        "happy",
                        "neutral",
                        "sad",
                        "surprised"
                    ],
                },
            },
        ],

    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
