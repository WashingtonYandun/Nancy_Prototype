import { Router } from "express";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { createNoteSchema } from "../schemas/note.schema.js";
import {
    getNotes,
    createNote,
    deleteNote,
    updateNote,
    getNote,
} from "../controllers/notes/notes.controller.js";


export const notesRoutes = Router();


notesRoutes.get(
    "/notes",
    auth,
    getNotes
);
notesRoutes.get(
    "/notes/:id",
    auth,
    getNote
);
notesRoutes.post(
    "/notes",
    auth,
    validateSchema(createNoteSchema),
    createNote
);
notesRoutes.put(
    "/notes/:id",
    auth,
    updateNote
);
notesRoutes.delete(
    "/notes/:id",
    auth,
    deleteNote
);
