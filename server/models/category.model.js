import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            minlength: [1, "title must be at least 1 character long"],
            maxlength: [32, "Name must be at most 60 characters long"],
        },
        description: {
            type: String,
            required: true,
            trim: true,
            minlength: [1, "description must be at least 1 character long"],
            maxlength: [256, "description must be at most 256 characters long"],
        },
        data: {
            type: String,
            required: true,
            trim: true,
            minlength: [1024, "Data must be at least 1024 character long"],
        },
        resources: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Resource",
            },
        ],
    },
    { timestamps: true }
);

const Category = mongoose.model("Category", categorySchema);

export { Category, categorySchema };

export { Category, categorySchema };
