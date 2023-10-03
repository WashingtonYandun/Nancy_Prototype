import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createCornellNoteSchema } from "../schemas/cornellNote.schema.js";
import {
    createCornellNote,
    deleteCornellNoteById,
    getCornellNoteById,
    getCornellNotes,
    updateCornellNoteById,
} from "../controllers/cornellNotes.controller.js";

// router for /api/notes
const notesRouter = Router();

// crud routes for cornell notes
notesRouter.get("/get/all", auth, getCornellNotes);
notesRouter.get("/get/:id", auth, getCornellNoteById);
notesRouter.post(
    "/create",
    auth,
    validateSchema(createCornellNoteSchema),
    createCornellNote
);
notesRouter.put("/note/:id", auth, updateCornellNoteById);
notesRouter.delete("/note/:id", auth, deleteCornellNoteById);

export { notesRouter };
