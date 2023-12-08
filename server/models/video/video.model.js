import mongoose from "mongoose";
import { classificationSchema } from "../classification/classification.model.js";

export const videoSchema = new mongoose.Schema(
    {
        uploaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        url: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "URL must be at least 3 characters long"],
        },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [64, "Title must be at most 64 characters long"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Description must be at least 3 characters long"],
            maxlength: [1000, "Description must be at most 1000 characters long"],
        },
        requirements: {
            type: String,
            trim: true,
            minlength: [3, "Requirements must be at least 3 characters long"],
            maxlength: [1000, "Requirements must be at most 1000 characters long"],
        },
        thumbnail: {
            type: String,
            trim: true,
        },
        language: {
            type: String,
            required: true,
            trim: true,
            enum: ["English", "Spanish", "French", "German", "Italian"],
        },
        duration: {
            type: Number,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
        },
        tags: [
            {
                type: String,
                trim: true,
            },
        ],
        comments: [
            {
                userId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                text: {
                    type: String,
                    required: true,
                    trim: true,
                },
            },
        ],
    },
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export { Video };
