import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: [1, "name must be at least 1 character long"],
    },
    url: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Url must be at least 1 character long"],
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: [1, "Description must be at least 1 character long"],
        maxlength: [1024, "Description must be at most 1024 characters long"],
    },
});

const Video = mongoose.model("Video", videoSchema);

export { Video, videoSchema };
