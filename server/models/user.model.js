import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            minlength: [3, "Name must be at least 3 characters long"],
            maxlength: [32, "Name must be at most 60 characters long"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            match: [
                /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                "Please fill a valid email address",
            ],
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [4, "Password must be at least 6 characters long"],
        },
        role: {
            type: String,
            enum: ["user", "admin", "root"],
            default: "user",
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", userSchema);
