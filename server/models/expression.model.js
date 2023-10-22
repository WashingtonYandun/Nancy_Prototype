import mongoose from "mongoose";

const expressionSchema = new mongoose.Schema(
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

const Expression = mongoose.model("Expression", expressionSchema);

export { Expression, expressionSchema };
