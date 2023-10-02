import mongoose from "mongoose";

const cornellNoteSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: { type: String, required: true, trim: true, unique: true },
        leftColumn: { type: String, required: true, trim: true }, // cues
        rightColumn: { type: String, required: true, trim: true }, // details
        bottomArea: { type: String, trim: true }, // summary
    },
    { timestamps: true }
);

const CornellNote = mongoose.model("CornellNote", cornellNoteSchema);

export { CornellNote };
