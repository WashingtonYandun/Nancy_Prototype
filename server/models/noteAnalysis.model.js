import mongoose from "mongoose";

const noteAnalysisSchema = new mongoose.Schema(
    {
        noteId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Note",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
        resources: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resource",
            },
        ],
        expressions_list: [
            {
                type: expressionSchema,
                required: true,
            },
        ],

        expressions_percentage: [
            {
                expression: {
                    type: String,
                    required: true,
                },
                percent: {
                    type: Number,
                    required: true,
                },
            },
        ],

        main_expression: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            required: true,
            enum: ["positive", "negative", "neutral"],
        },
    },
    { timestamp: true }
);

const NoteAnalysis = mongoose.model("NoteAnalysis", noteAnalysisSchema);

export { NoteAnalysis, noteAnalysisSchema };
