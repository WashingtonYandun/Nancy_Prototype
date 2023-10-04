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
} from "../controllers/notes.controller.js";

const router = Router();

router.get("/notes", auth, getNotes);

router.post("/notes", auth, validateSchema(createNoteSchema), createNote);

router.get("/notes/:id", auth, getNote);

router.put("/notes/:id", auth, updateNote);

router.delete("/notes/:id", auth, deleteNote);

export default router;
