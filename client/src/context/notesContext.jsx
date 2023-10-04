import { createContext, useContext, useState } from "react";
import {
    getNotesRequest,
    deleteNoteRequest,
    createNoteRequest,
    getNoteRequest,
    updateNoteRequest,
} from "../api/note";

const NoteContext = createContext();

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context)
        throw new Error("useNotes must be used within a NoteProvider");
    return context;
};

export function NoteProvider({ children }) {
    const [notes, setNotes] = useState([]);

    const getNotes = async () => {
        const res = await getNotesRequest();
        setNotes(res.data);
    };

    const deleteNote = async (id) => {
        try {
            const res = await deleteNoteRequest(id);
            if (res.status === 204)
                setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    const createNote = async (note) => {
        try {
            const res = await createNoteRequest(note);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const getNote = async (id) => {
        try {
            const res = await getNoteRequest(id);
            return res.data;
        } catch (error) {
            console.error(error);
        }
    };

    const updateNote = async (id, note) => {
        try {
            await updateNoteRequest(id, note);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <NoteContext.Provider
            value={{
                notes: notes,
                getNotes: getNotes,
                deleteNote: deleteNote,
                createNote: createNote,
                getNote: getNote,
                updateNote: updateNote,
            }}
        >
            {children}
        </NoteContext.Provider>
    );
}
