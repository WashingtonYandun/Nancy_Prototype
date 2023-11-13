import { useEffect } from "react";
import { useNotes } from "../../context/notesContext";
import { NoteCard } from "../../components/notes/NoteCard";
import { Navbar } from "../../components/Navbar";
import Footer from "../../components/Footer";

export function VideosPage() {
    const { notes, getNotes } = useNotes();

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto my-8 px-4 min-h-screen">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                        <h2 className="font-bold text-xl text-center mt-4">
                            No sessions yet, please start session
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {notes.map((note) => (
                            <NoteCard note={note} key={note._id} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
