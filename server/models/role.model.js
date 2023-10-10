import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [32, "Name must be at most 60 characters long"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Description is required"],
            minlength: [3, "Description must be at least 3 characters long"],
            maxlength: [32, "Description must be at most 60 characters long"],
            trim: true,
        },
    },
    { timestamps: true }
);

const Role = mongoose.model("Role", roleSchema);

export { Role };
