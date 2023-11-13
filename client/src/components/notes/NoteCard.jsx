import { useNotes } from "../../context/notesContext";
import { Button, ButtonLink, Card } from "../ui";

export function NoteCard({ note }) {
    const { deleteNote } = useNotes();

    return (
        <Card className="p-6 bg-secondary rounded-md shadow-md">
            <header className="flex justify-between mb-4 truncate">
                <h1 className="text-2xl font-bold text-text truncate">
                    {note.title}
                </h1>
            </header>

            <div className="mb-4">
                <p className="text-text truncate">{note.leftColumn}</p>
                <p className="text-text truncate">{note.rightColumn}</p>
                <p className="text-text truncate">{note.bottomArea}</p>
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => deleteNote(note._id)}
                    className="bg-error hover:bg-joy"
                >
                    Delete
                </Button>
                <ButtonLink
                    to={`/notes/${note._id}`}
                    className="bg-accent hover:bg-joy"
                >
                    Edit
                </ButtonLink>
            </div>
        </Card>
    );
}
