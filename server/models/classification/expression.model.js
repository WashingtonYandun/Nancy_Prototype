import mongoose from 'mongoose';

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