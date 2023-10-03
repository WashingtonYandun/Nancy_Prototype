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
const cornellNotesRouter = Router();

// crud routes for cornell notes
cornellNotesRouter.get("/get/all", auth, getCornellNotes);
cornellNotesRouter.get("/get/:id", auth, getCornellNoteById);
cornellNotesRouter.post(
    "/create",
    auth,
    validateSchema(createCornellNoteSchema),
    createCornellNote
);
cornellNotesRouter.put("/note/:id", auth, updateCornellNoteById);
cornellNotesRouter.delete("/note/:id", auth, deleteCornellNoteById);

export { cornellNotesRouter };
