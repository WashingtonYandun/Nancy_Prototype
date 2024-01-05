import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../context/courseContext";
import { useVideo } from "../../context/videoContext";
import { Navbar } from "../../components/general/Navbar.jsx";
import { useForm } from "react-hook-form";
import * as faceapi from "face-api.js";
import { useUserCourse } from "../../context/userCourseContext.jsx";
import { useAuth } from "../../context/authContext.jsx";

export const CourseView = () => {
    const { id } = useParams();
    const { getCourse } = useCourses();
    const { getVideo } = useVideo();
    const { createUserCourse } = useUserCourse();
    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);
    const [isRecognitionActive, setIsRecognitionActive] = useState(false);
    const videoRef = useRef();
    let expressions = [];
    const { user } = useAuth();

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const getYouTubeVideoId = (url) => {
        const youtubeRegex =
            /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;

        const match = url.match(youtubeRegex);
        return match ? match[1] : null;
    };

    useEffect(() => {
        const loadCourse = async () => {
            const data = await getCourse(id);
            setCourseDetails(data);
        };
        loadCourse();
    }, [id, getCourse]);

    useEffect(() => {
        const loadVideos = async () => {
            const videos = await Promise.all(
                courseDetails.videos.map((video) => getVideo(video))
            );
            setVideos(videos);
            setSelectedVideo(videos[0]);
        };
        if (courseDetails) {
            loadVideos();
        }
    }, [courseDetails, getVideo]);

    const handleVideoSelection = (video) => {
        setSelectedVideo(video);
    };

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

        console.log(expressions);

        return () => clearInterval(intervalId); // Clean up the interval on unmount
    }, [isRecognitionActive]);

    const onSubmit = async (data) => {
        try {
            const expressionPercentages = getExpressionPercentage(expressions);

            data.expressions = expressionPercentages;
            data.courseId = courseDetails._id;
            data.userId = user.id;
            console.log(user.id);
            handleStopRecognition();

            console.log(expressions);

            createUserCourse(data);

            console.log(data);
            navigate("/courses");
        } catch (error) {
            console.error("Error submiting", error, data);
        }
    };

    const getExpressionPercentage = (expressions) => {
        // get the expressions and global percentage of each expression
        const total = expressions.length;
        const expressionPercentages = {};

        expressions.forEach((expression) => {
            for (let key in expression) {
                if (expressionPercentages[key]) {
                    expressionPercentages[key] += expression[key];
                } else {
                    expressionPercentages[key] = expression[key];
                }
            }
        });

        for (let key in expressionPercentages) {
            expressionPercentages[key] = expressionPercentages[key] / total;
        }

        return expressionPercentages;
    };

    return (
        <>
            <Navbar></Navbar>
            <button
                className="bg-blue-500 text-white p-2 rounded-md"
                onClick={handleStartRecognition}
            >
                Click this to start recognition
            </button>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <button className="bg-green-500 text-white p-2 rounded-md">
                    SEND DATA
                </button>

                <div id="recognition">
                    <video
                        crossOrigin="anonymous"
                        ref={videoRef}
                        autoPlay
                        style={{ display: "none" }}
                    ></video>
                </div>
                <div className="mx-auto p-4 bg-gray-100 flex">
                    {courseDetails ? (
                        <div className="flex-1">
                            <div>
                                <h1 className="text-3xl font-bold text-blue-700">
                                    {courseDetails.title}
                                </h1>
                                <p className="text-gray-600">
                                    {courseDetails.description}
                                </p>
                                <p className="text-gray-600">
                                    {courseDetails.language}
                                </p>
                                <p className="text-gray-600">
                                    {courseDetails.category}
                                </p>
                                <p className="text-gray-600">
                                    {courseDetails.subcategory}
                                </p>
                            </div>
                            <div className="mt-4">
                                {selectedVideo && (
                                    <div>
                                        <iframe
                                            width="80%"
                                            height="400px"
                                            videoid={getYouTubeVideoId(
                                                selectedVideo.url
                                            )}
                                            src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                                selectedVideo.url
                                            )}`}
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="shadow-lg rounded"
                                        ></iframe>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div className="flex flex-col ml-4">
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                onClick={() => handleVideoSelection(video)}
                                className={`p-4 border rounded cursor-pointer hover:bg-gray-200 ${
                                    selectedVideo &&
                                    selectedVideo._id === video._id
                                        ? "bg-gray-200"
                                        : ""
                                }`}
                            >
                                <p className="font-semibold">{video.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </form>
        </>
    );
};
