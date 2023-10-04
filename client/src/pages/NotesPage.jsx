import { useEffect } from "react";
import { useNotes } from "../context/notesContext";
import { NoteCard } from "../components/notes/NoteCard";
import { ImFileEmpty } from "react-icons/im";

export function NotesPage() {
    const { notes, getNotes } = useNotes();

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            {notes.length === 0 && (
                <div className="flex justify-center items-center p-10">
                    <div>
                        <ImFileEmpty className="text-6xl text-white-400 m-auto my-2" />
                        <h1 className="font-bold text-xl">
                            No notes yet, please add a new note/session
                        </h1>
                    </div>
                </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                {notes.map((note) => (
                    <NoteCard note={note} key={note._id} />
                ))}
            </div>
        </>
    );
}
