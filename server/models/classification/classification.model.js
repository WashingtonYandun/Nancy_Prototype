import mongoose from 'mongoose';

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
