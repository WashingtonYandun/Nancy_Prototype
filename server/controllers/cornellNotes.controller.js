import { CornellNote } from "../models/cornellNote.model.js";

export const getNotea = async (req, res) => {
    try {
        const allNotes = await CornellNote.find({ user: req.user.id }).populate(
            "user"
        );
        res.json(allNotes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getNote = async (req, res) => {
    try {
        const note = await CornellNote.findById(req.params.id).populate("user");
        res.json(note);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createNote = async (req, res) => {
    try {
        const { title, leftColumn, rightColumn, bottomArea } = req.body;

        const newNote = new CornellNote({
            user: req.user.id,
            title: title,
            leftColumn: leftColumn,
            rightColumn: rightColumn,
            bottomArea: bottomArea,
        });

        const savedNote = await newNote.save();
        res.json(savedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateNote = async (req, res) => {
    try {
        const updatedNote = await CornellNote.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const deletedNote = await CornellNote.findByIdAndDelete(req.params.id);
        res.json(deletedNote);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
