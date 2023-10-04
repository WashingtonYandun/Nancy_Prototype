import mongoose from "mongoose";

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
            // required: true,
            trim: true,
            unique: true,
        },
        leftColumn: {
            type: String,
            // required: true,
            trim: true,
        }, // cues
        rightColumn: {
            type: String,
            // required: true,
            trim: true,
        }, // details
        bottomArea: {
            type: String,
            // required: true,
            trim: true,
        }, // summary
    },
    { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export { Note };
