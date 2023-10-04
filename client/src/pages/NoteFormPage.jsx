import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useNotes } from "../context/notesContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";

export function NoteFormPage() {
    const { createNote, getNote, updateNote } = useNotes();
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (params.id) {
                updateNote(params.id, {
                    ...data,
                });
            } else {
                createNote({
                    ...data,
                });
            }

            navigate("/notes");
        } catch (error) {
            console.log("error", error, data);
            console.log(error);
            // window.location.href = "/";
        }
    };

    useEffect(() => {
        const loadNote = async () => {
            console.log(params);
            if (params.id) {
                const note = await getNote(params.id);

                setValue("title", note.title);
                setValue("leftColumn", note.leftColumn);
                setValue("rightColumn", note.rightColumn);
                setValue("bottomArea", note.bottomArea);
            }
        };
        loadNote();
    }, []);

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    {...register("title")}
                    autoFocus
                />
                {errors.title && (
                    <p className="text-red-500 text-xs italic">
                        Please enter a title.
                    </p>
                )}

                <Label htmlFor="leftColumn">Left Column</Label>
                <Textarea
                    name="leftColumn"
                    id="leftColumn"
                    rows="3"
                    placeholder="leftColumn"
                    {...register("leftColumn")}
                ></Textarea>

                <Label htmlFor="rightColumn">Right Column</Label>
                <Textarea
                    name="rightColumn"
                    id="rightColumn"
                    rows="3"
                    placeholder="rightColumn"
                    {...register("rightColumn")}
                ></Textarea>

                <Label htmlFor="bottomArea">Bottom Area</Label>
                <Textarea
                    name="bottomArea"
                    id="bottomArea"
                    rows="3"
                    placeholder="bottomArea"
                    {...register("bottomArea")}
                ></Textarea>

                <Button>Save</Button>
            </form>
        </Card>
    );
}
