import mongoose from "mongoose";
import {expressionSchema} from "../classification/expression.model.js";

export const userVideoInteractionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        videoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video",
            required: true,
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

export const UserVideoInteraction = mongoose.model("UserVideoInteraction", userVideoInteractionSchema);
