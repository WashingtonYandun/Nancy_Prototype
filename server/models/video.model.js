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
            minlength: [3, "title must be at least 1 character long"],
            maxlength: [64, "Name must be at most 60 characters long"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "description must be at least 1 character long"],
        },
        url: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "url must be at least 1 character long"],
        },
        classification: {
            type: classificationSchema,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model("Video", videoSchema);

export { Video };
