import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCourses } from "../../context/courseContext";
import { useVideo } from "../../context/videoContext";
import { Navbar } from "../../components/general/Navbar.jsx";
import { useForm } from "react-hook-form";
import * as faceapi from "face-api.js";
import { updateCourseRequest } from "../../api/courses.js";

export const CourseView = () => {
    const { id } = useParams();
    const { getCourse, updateCourse } = useCourses();
    const { getVideo } = useVideo();
    const navigate = useNavigate();

    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);

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

    return (
        <>
            <Navbar></Navbar>
            <button className="bg-blue-500 hover-bg-blue-600 text-white focus-outline-none">
                Click this to start recognition
            </button>

            <form className="space-y-3">
                <button>SEND DATA</button>
            </form>
            {/* <div id="recognition">
                <video
                    crossOrigin="anonymous"
                    ref={videoRef}
                    autoPlay
                    style={{ display: "none" }}
                ></video>
            </div> */}
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
                                selectedVideo && selectedVideo._id === video._id
                                    ? "bg-gray-200"
                                    : ""
                            }`}
                        >
                            <p className="font-semibold">{video.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="comments"></div>
            <div className="interactions"></div>
        </>
    );
};
