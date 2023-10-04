import { Note } from "../models/note.model.js";

export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ userId: req.user.id }).populate(
            "userId"
        );
        res.json(notes);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, leftColumn, rightColumn, bottomArea } = req.body;
        const userId = req.user.id;
        const newNote = new Note({
            title,
            leftColumn,
            rightColumn,
            bottomArea,
            userId: userId,
        });
        await newNote.save();
        res.json(newNote);
    } catch (error) {
        console.log(error, req.body, req.user.id);
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);

        if (!deletedNote) {
            return res.status(404).json({ message: "Task not found" });
        }

        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { title, leftColumn, rightColumn, bottomArea } = req.body;

        const noteUpdated = await Note.findOneAndUpdate(
            { _id: req.params.id },
            {
                title,
                leftColumn,
                rightColumn,
                bottomArea,
            },
            { new: true }
        );
        return res.json(noteUpdated);
    } catch (error) {
        console.log("error", error);
        console.log("req.body", req.body);
        console.log("req.params.id", req.params.id);
        return res.status(500).json({ message: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            console.log("not found get");
            return res.status(404).json({ message: "Task not found" });
        }
        return res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};