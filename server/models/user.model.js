import mongoose from "mongoose";
import { Role } from "./role.model.js";

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
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role",
                default: Role.findOne({ name: "user" }),
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export { User };
