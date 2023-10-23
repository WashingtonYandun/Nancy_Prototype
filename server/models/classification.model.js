import mongoose from "mongoose";

const classificationSchema = new mongoose.Schema({
    category: String,
    matches: [
        {
            category: String,
            probability: Number,
        },
    ],
    _id: false,
});

const Classification = mongoose.model("Classification", classificationSchema);

export { Classification, classificationSchema };
