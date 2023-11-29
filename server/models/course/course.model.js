import mongoose from "mongoose";
import { classificationSchema } from "../note.model";

const courseSchema = new mongoose.Schema(
    {
        instructorId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        videos: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Video'
            }
        ],
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Title must be at least 3 characters long"],
            maxlength: [100, "Title must be at most 100 characters long"],
        },
        classification: {
            type: classificationSchema,
            required: true,
        },


        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Description must be at least 3 characters long"],
        },
        thumbnail: {
            type: String,
            minlength: [3, "Thumbnail must be at least 3 characters long"],
            trim: true,
        },
        subclassification: {
            type: classificationSchema,
        },

    },
    { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
