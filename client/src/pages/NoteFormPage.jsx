import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input, Label } from "../components/ui";
import { useNotes } from "../context/notesContext";
import { Textarea } from "../components/ui/Textarea";
import { useForm } from "react-hook-form";
import * as faceapi from "face-api.js";

export function NoteFormPage() {
    // array for collecting expressions
    const expressions = [];

    // note
    const { createNote, getNote, updateNote } = useNotes();
    const navigate = useNavigate();
    const params = useParams();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [isRecognitionActive, setIsRecognitionActive] = useState(false);

    const onSubmit = async (data) => {
        try {
            if (
                !data.title ||
                !data.leftColumn ||
                !data.rightColumn ||
                !data.bottomArea
            ) {
                return;
            }

            data.expressions = expressions;

            if (params.id) {
                updateNote(params.id, {
                    ...data,
                });
                console.log(data);
            } else {
                createNote({
                    ...data,
                });
                console.log(data);
            }
            setIsRecognitionActive(false); // Detener la recolección al guardar
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

    // recognition
    const videoRef = useRef();

    useEffect(() => {
        const startRecognition = async () => {
            try {
                await startVideo();
                await loadModels();

                const intervalId = setInterval(async () => {
                    if (isRecognitionActive) {
                        await faceMyDetect();
                    }
                }, 1000);

                // Limpia el intervalo cuando el componente se desmonta
                return () => clearInterval(intervalId);
            } catch (error) {
                console.error("Error during recognition setup:", error);
            }
        };

        startRecognition();
    }, [isRecognitionActive]); // Agregar isRecognitionActive como dependencia

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
        } catch (error) {
            console.error("Error starting video:", error);
            throw error; // Propagate the error for better handling
        }
    };

    const loadModels = async () => {
        try {
            await Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
                faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
                faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
                faceapi.nets.faceExpressionNet.loadFromUri("/models"),
            ]);
        } catch (error) {
            console.error("Error loading models:", error);
            throw error; // Propagate the error for better handling
        }
    };

    const faceMyDetect = async () => {
        try {
            const detections = await faceapi
                .detectAllFaces(
                    videoRef.current,
                    new faceapi.TinyFaceDetectorOptions()
                )
                .withFaceLandmarks()
                .withFaceExpressions();

            if (detections.length > 0) {
                let expression = {
                    angry: detections[0].expressions.angry,
                    disgusted: detections[0].expressions.disgusted,
                    fearful: detections[0].expressions.fearful,
                    happy: detections[0].expressions.happy,
                    neutral: detections[0].expressions.neutral,
                    sad: detections[0].expressions.sad,
                    surprised: detections[0].expressions.surprised,
                };
                expressions.push(expression);
                console.log(expressions);
            }
        } catch (error) {
            console.error("Error during face detection:", error);
        }
    };

    const handleStartRecognition = () => {
        setIsRecognitionActive(true);
    };

    const handleStopRecognition = () => {
        setIsRecognitionActive(false);
    };

    return (
        <>
            <div id="recognition">
                <video
                    crossOrigin="anonymous"
                    ref={videoRef}
                    autoPlay
                    style={{ display: "none" }}
                ></video>
            </div>

            <div className="h-screen flex items-center justify-center">
                <Button
                    className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus-outline-none"
                    onClick={handleStartRecognition}
                >
                    Set a title and Start Recognition
                </Button>

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
                            className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
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
                                className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
                            />

                            <Textarea
                                name="rightColumn"
                                id="rightColumn"
                                rows="8"
                                placeholder="Right Column"
                                {...register("rightColumn")}
                                className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
                            />
                        </div>

                        <Textarea
                            name="bottomArea"
                            id="bottomArea"
                            rows="4"
                            placeholder="Bottom Area"
                            {...register("bottomArea")}
                            className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
                        />

                        <Button
                            type="submit"
                            className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 rounded focus-outline-none"
                            onClick={handleStopRecognition}
                        >
                            Save
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
}
