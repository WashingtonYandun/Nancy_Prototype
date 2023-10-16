import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useNotes } from "../context/notesContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { Navbar } from "../components/Navbar";
import Footer from "../components/Footer";
import { RecognitionSession } from "../components/RecognitionSession";

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
        <>
            <RecognitionSession />

            <div className="h-screen flex items-center justify-center">
                <Card className="w-full max-w-xl p-6 bg-gray-800 text-white rounded-md shadow-md">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <Input
                            type="text"
                            name="title"
                            placeholder="Title"
                            {...register("title")}
                            autoFocus
                            className="w-full bg-gray-700 text-white rounded border-none focus:outline-none py-2 px-3"
                        />
                        {errors.title && (
                            <p className="text-error">Please enter a title.</p>
                        )}

                        <div className="grid grid-cols-2 gap-4">
                            <Textarea
                                name="leftColumn"
                                id="leftColumn"
                                rows="8"
                                placeholder="Left Column"
                                {...register("leftColumn")}
                                className="w-full bg-gray-700 text-white rounded border-none focus:outline-none py-2 px-3"
                            />

                            <Textarea
                                name="rightColumn"
                                id="rightColumn"
                                rows="8"
                                placeholder="Right Column"
                                {...register("rightColumn")}
                                className="w-full bg-gray-700 text-white rounded border-none focus:outline-none py-2 px-3"
                            />
                        </div>

                        <Textarea
                            name="bottomArea"
                            id="bottomArea"
                            rows="4"
                            placeholder="Bottom Area"
                            {...register("bottomArea")}
                            className="w-full bg-gray-700 text-white rounded border-none focus:outline-none py-2 px-3"
                        />

                        <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none">
                            Save
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
