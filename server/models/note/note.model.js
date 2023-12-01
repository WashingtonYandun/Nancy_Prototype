import mongoose from "mongoose";
import { classificationSchema } from "../classification/classification.model.js";
import { expressionSchema } from "../classification/expression.model.js";

export const noteSchema = new mongoose.Schema(
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
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [1, "title must be at least 1 character long"],
            maxlength: [64, "Name must be at most 60 characters long"],
        },
        leftColumn: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "Cues must be at least 1 character long"],
        },
        rightColumn: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "Key thoughts must be at least 1 character long"],
        },
        bottomArea: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "Summary must be at least 1 character long"],
        },
        classification: {
            type: classificationSchema,
        },
        expressions: [
            {
                type: expressionSchema,
                required: true,
            },
        ],
    },
    { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
