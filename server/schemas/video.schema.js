import { z } from "zod";

export const createVideoSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    description: z.string({
        required_error: "Description is required",
    }),
    url: z.string({
        required_error: "URL is required",
    }),
    classification: z.string({
        required_error: "Category is required",
    }),
    uploaderId: z.string({
        required_error: "User ID is required",
    }),
});
