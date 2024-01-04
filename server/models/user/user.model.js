import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Name is required"],
            minlength: [6, "Name must be at least 3 characters long"],
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
            minlength: [6, "Password must be at least 6 characters long"],
            maxlength: [64, "Password must be at most 32 characters long"],
        },
        role: {
            type: String,
            required: true,
            enum: ["user", "instructor", "admin"],
            default: "user",
        },
        location: {
            latitude: {
                type: Number,
            },
            longitude: {
                type: Number,
            },
            country: {
                type: String,
            },
        },

    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
