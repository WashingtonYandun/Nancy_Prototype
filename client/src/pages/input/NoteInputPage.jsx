import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Input } from "../../components/ui";
import { useNotes } from "../../context/notesContext";
import { Textarea } from "../../components/ui/Textarea";
import { useForm } from "react-hook-form";
import { useVideo } from "../../context/videoContext";

export function NoteInputVideoPage() {
    const { getVideo } = useVideo();
    const { createNote, getNote, updateNote } = useNotes();
    const [isRecognitionActive, setIsRecognitionActive] = useState(false);
    const [expressions, setExpressions] = useState([]);

    const videoRef = useRef();
    const navigate = useNavigate();
    const params = useParams();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
            });
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = () => {};
        } catch (error) {
            console.error("Error starting video:", error);
            throw error;
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
            throw error;
        }
    };

    const faceMyDetect = async () => {
        try {
            if (!videoRef.current) {
                return;
            }

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

                setExpressions((prevExpressions) => [
                    ...prevExpressions,
                    expression,
                ]);
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

    const onSubmit = async (data) => {
        try {
            data.expressions = expressions;
            if (
                !data.title ||
                !data.leftColumn ||
                !data.rightColumn ||
                !data.bottomArea ||
                !expressions.length ||
                !classification
            ) {
                return alert(
                    "Please fill all the fields and start recognition"
                );
            }

            handleStopRecognition();

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

    useEffect(() => {
        startVideo();
        loadModels();
    }, []); // Run this effect only once on component mount

    useEffect(() => {
        const intervalId = setInterval(async () => {
            if (isRecognitionActive) {
                faceMyDetect();
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, [isRecognitionActive]);

    useEffect(() => {}, [expressions]);

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
            <Button
                className="bg-blue-500 hover-bg-blue-600 text-white py-2 px-4 focus-outline-none"
                onClick={handleStartRecognition}
            >
                Click this to start recognition
            </Button>

            <div className="grid grid-cols-2 h-screen">
                {/* Read section */}
                <div className="read-section bg-gray-200 h-[10vh]"></div>

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
