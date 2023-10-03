import { z } from "zod";

const createCornellNoteSchema = z.object({
    title: z.string({
        required_error: "Title is required",
    }),
    leftColumn: z.string({
        required_error: "Left Column is required",
    }),
    rightColumn: z.string({
        required_error: "Right Column is required",
    }),
    bottomArea: z.string(),
});

export { createCornellNoteSchema };
