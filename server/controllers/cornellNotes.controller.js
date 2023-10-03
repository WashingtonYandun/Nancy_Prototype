import { CornellNote } from "../models/cornellNote.model.js";

const createCornellNote = async (req, res) => {
    try {
        const { title, leftColumn, rightColumn, bottomArea } = req.body;

        const newCornellNote = new CornellNote({
            userId: req.user.id,
            title,
            leftColumn,
            rightColumn,
            bottomArea,
        });

        const cornellNoteSaved = await newCornellNote.save();
        res.json(cornellNoteSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCornellNotes = async (req, res) => {
    try {
        const cornellNotes = await CornellNote.find({ userId: req.user.id });
        res.json(cornellNotes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCornellNoteById = async (req, res) => {
    try {
        const cornellNote = await CornellNote.findById(req.params.id);
        res.json(cornellNote);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCornellNoteById = async (req, res) => {
    try {
        const { title, leftColumn, rightColumn, bottomArea } = req.body;
        const cornellNoteUpdated = await CornellNote.findByIdAndUpdate(
            req.params.id,
            {
                title,
                leftColumn,
                rightColumn,
                bottomArea,
            },
            { new: true }
        );
        res.json(cornellNoteUpdated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCornellNoteById = async (req, res) => {
    try {
        await CornellNote.findByIdAndDelete(req.params.id);
        res.json({ message: "CornellNote Deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export {
    createCornellNote,
    getCornellNotes,
    getCornellNoteById,
    updateCornellNoteById,
    deleteCornellNoteById,
};
