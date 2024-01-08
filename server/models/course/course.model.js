import mongoose from "mongoose";
import { classificationSchema } from "../classification/classification.model.js";

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
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        thumbnail: {
            type: String,
            trim: true,
        },
        language: {
            type: String,
            trim: true,
            enum: ["en", "es", "fr", "it", "gr"],
        },
        classification: {
            type: classificationSchema,
        },
        subclassification: {
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
                    enum: [
                        "angry",
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
        requirements: [
            {
                type: String,
                trim: true,
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ["draft", "published", "deleted"],
            default: "draft",
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        recommendation_count: {
            type: Number,
            default: 1,
            max: 100,
        },
    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
