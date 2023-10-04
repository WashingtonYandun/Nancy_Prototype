import { useNotes } from "../../context/notesContext";
import { Button, ButtonLink, Card } from "../ui";

export function NoteCard({ note }) {
    const { deleteNote } = useNotes();

    return (
        <Card>
            <header className="flex justify-between ">
                <h1 className="text-2xl font-bold">{note.title}</h1>
            </header>

            <div>
                <p className="text-slate-300">{note.leftColumn}</p>
                <br />
                <p className="text-slate-300">{note.rightColumn}</p>
                <br />
                <p className="text-slate-300">{note.bottomArea}</p>
            </div>

            <div className="flex gap-x-2 items-center">
                <Button onClick={() => deleteNote(note._id)}>Delete</Button>
                <ButtonLink to={`/notes/${note._id}`}>Edit</ButtonLink>
            </div>
        </Card>
    );
}
