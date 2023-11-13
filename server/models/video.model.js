import mongoose from "mongoose";

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
            minlength: [1, "title must be at least 1 character long"],
            maxlength: [64, "Name must be at most 60 characters long"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "description must be at least 1 character long"],
        },
        url: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "url must be at least 1 character long"],
        },
        classification: {
            type: classificationSchema,
        },
    },
    { timestamps: true }
);