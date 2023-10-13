import mongoose from "mongoose";

const emotionSchema = new mongoose.Schema(
    {
        neutral: Number,
        happy: Number,
        sad: Number,
        angry: Number,
        fearful: Number,
    },
    { timestamps: true },
    { _id: false }
);

const Emotion = mongoose.model("Emotion", emotionSchema);

export { Emotion, emotionSchema };
