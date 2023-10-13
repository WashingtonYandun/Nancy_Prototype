import mongoose from "mongoose";
import { emotionSchema } from "./emotion.model.js";

// need improvement (images, links, etc)
const noteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },
        leftColumn: {
            type: String,
            required: true,
            trim: true,
        },
        rightColumn: {
            type: String,
            required: true,
            trim: true,
        },
        bottomArea: {
            type: String,
            required: true,
            trim: true,
        },
        emotion: [emotionSchema],
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export { Note };
