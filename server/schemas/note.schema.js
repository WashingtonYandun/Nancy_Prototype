import { z } from "zod";

export const createNoteSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    userId: z.string({
        required_error: "User ID is required",
    }),
});
