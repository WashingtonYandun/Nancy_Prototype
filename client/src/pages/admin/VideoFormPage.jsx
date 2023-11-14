import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input } from "../../components/ui";
import { useNotes } from "../../context/notesContext";
import { Textarea } from "../../components/ui/Textarea";
import { useForm } from "react-hook-form";
import axios from "axios";

export function VideoFormPage() {
    const { createNote, getNote, updateNote } = useNotes();
    const navigate = useNavigate();
    const params = useParams();
    const [classification, setClassification] = useState(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            data.expressions = expressions;
            if (1) {
                return alert(
                    "Please fill all the fields and start recognition"
                );
            }

            if (params.id) {
                updateNote(params.id, {
                    ...data,
                    expressions,
                    classification,
                });
            } else {
                createNote({
                    ...data,
                    expressions,
                    classification,
                });
            }
            console.log(data);
            navigate("/notes");
        } catch (error) {
            console.error("Error submiting", error, data);
        }
    };

    const fetchCategory = async (title) => {
        if (title) {
            const response = await axios.post(
                "https://nancy-classifier-wy.vercel.app/class",
                { title }
            );

            if (response.status === 200) {
                let mydata = {
                    category: response.data.category,
                    matches: response.data.matches,
                };
                setClassification(mydata);
            } else {
                console.error("Error using Classifier api", response);
            }
        }
    };

    const handleTitleChange = async (event) => {
        try {
            const title = event.target.value;
            if (title) {
                try {
                    const result = await fetchCategory(title);
                    if (result) {
                        setClassification(result.classification);
                    }
                } catch (error) {
                    console.error("Error getting classification:", error);
                }
            } else {
                setClassification(null);
            }
        } catch (error) {
            console.error("Error with text classification:", error);
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
            <div className="grid grid-cols-1 h-screen">
                {/* Summary section */}
                <Card className="w-full max-w-xl p-6 bg-gray-800 text-white rounded-md shadow-md h-[10vh]">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        <div className="flex flex-column">
                            <Input
                                type="text"
                                name="title"
                                placeholder="Title"
                                {...register("title")}
                                autoFocus
                                className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
                                onChange={handleTitleChange}
                            />
                            {errors.title && (
                                <p className="text-error">
                                    Please enter a title.
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-4 h-[65vh]">
                            <Textarea
                                name="leftColumn"
                                id="leftColumn"
                                rows="auto"
                                placeholder="Left Column"
                                {...register("leftColumn")}
                                className="w-full h-full bg-gray-700 text-white rounded border-none focus-outline-none px-3"
                            />

                            <Textarea
                                name="rightColumn"
                                id="rightColumn"
                                rows="auto"
                                placeholder="Right Column"
                                {...register("rightColumn")}
                                className="w-full h-full bg-gray-700 text-white rounded border-none focus-outline-none px-3"
                            />
                        </div>

                        <Textarea
                            name="bottomArea"
                            id="bottomArea"
                            rows="4"
                            placeholder="Bottom Area"
                            {...register("bottomArea")}
                            className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3 h-[35vh]"
                        />

                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded focus-outline-none"
                        >
                            Save
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
