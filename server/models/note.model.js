import mongoose from "mongoose";

export const classificationSchema = new mongoose.Schema({
    category: String,
    matches: [
        {
            category: String,
            probability: Number,
        },
    ],
    _id: false,
});

export const expressionSchema = new mongoose.Schema(
    {
        angry: Number,
        disgusted: Number,
        fearful: Number,
        happy: Number,
        neutral: Number,
        sad: Number,
        surprised: Number,
    },
    { _id: false }
);

// need improvement (images, links, etc)
export const noteSchema = new mongoose.Schema(
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
