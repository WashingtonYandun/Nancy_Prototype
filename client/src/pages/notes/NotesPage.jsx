import { useEffect, useState } from "react";
import { useNotes } from "../../context/notesContext";
import { NoteCard } from "../../components/notes/NoteCard";
import { Navbar } from "../../components/general/Navbar";
import { Footer } from "../../components/general/Footer";
import { Dropdown } from "../../components/general/Dropdown";
import {Link} from "react-router-dom";

export const NotesPage = () => {
    const { notes, getNotes, updateNote, createNote, getNote, deleteNote } =
        useNotes();

    const categories = [
        "Technology",
        "Science",
        "Software Development",
        "Business",
        "Art & Design",
        "Teaching & Academics",
        "Personal Development",
        "Health & Fitness",
        "Lifestyle",
    ];

    const [filteredCategory, setFilteredCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setFilteredCategory(category);
    };

    const filteredNotes = filteredCategory
        ? notes.filter(
              (note) => note.classification.category === filteredCategory
          )
        : notes;

    useEffect(() => {
        getNotes();
    }, []);

    return (
        <>
            <Navbar />

            <div className="flex flex-row border-b-2 bg-teal-50 justify-between items-center text-white py-2 px-4">
                <Link
                    to="/add-note"
                    className="bg-accent hover:bg-joy text-white py-2 px-4 flex items-center justify-center rounded-md"
                >
                    Add Note
                </Link>

                <Dropdown
                    categories={categories}
                    onSelectCategory={handleCategoryChange}
                    selectedCategory={filteredCategory}
                />
            </div>

            <div className="container mx-auto my-8 px-4 min-h-screen">
                {notes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                        <h2 className="font-bold text-xl text-center mb-4">
                            No sessions yet, please start a session
                        </h2>
                    </div>
                ) : (
                    <div className="">
                        {filteredNotes.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                                <h2 className="font-bold text-xl text-center mb-4">
                                    No sessions yet, please start a session
                                </h2>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredNotes.map((note) => (
                                    <NoteCard
                                        key={note._id}
                                        note={note}
                                        onDelete={deleteNote}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};
