import { z } from "zod";

export const noteSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
});
