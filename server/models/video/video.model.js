import mongoose from "mongoose";
import { classificationSchema } from "../classification/classification.model.js";

export const videoSchema = new mongoose.Schema(
    {
        uploaderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
        },
        url: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "URL must be at least 3 characters long"],
        },
        duration: {
            type: Number,
            required: true,
        },
        publishDate: {
            type: Date,
            required: true,
        },
        views: {
            type: Number,
            default: 0,
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
        thumbnail: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export { Video };
