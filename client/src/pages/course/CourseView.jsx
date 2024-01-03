import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCourses } from "../../context/courseContext";
import { useVideo } from "../../context/videoContext";

export const CourseView = () => {
    const { id } = useParams(); // Obtains the ID of the course from the URL
    const { getCourse } = useCourses();
    const { getVideo } = useVideo();
    const [videos, setVideos] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [courseDetails, setCourseDetails] = useState(null);

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
        };
        if (courseDetails) {
            loadVideos();
        }
    }, [courseDetails, getVideo]);

    const handleVideoSelection = (video) => {
        setSelectedVideo(video);
    };

    return (
        <div className="bg-amber-500 p-8">
            {courseDetails ? (
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-2/3">
                        <h1 className="text-3xl font-bold mb-4">
                            {courseDetails.title}
                        </h1>
                        <p className="text-gray-700 mb-2">
                            {courseDetails.description}
                        </p>
                        <p className="text-gray-700 mb-2">
                            {courseDetails.language}
                        </p>
                        <p className="text-gray-700 mb-2">
                            {courseDetails.category}
                        </p>
                        <p className="text-gray-700 mb-2">
                            {courseDetails.subcategory}
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        {selectedVideo && (
                            <div className="flex justify-center items-center">
                                <iframe
                                    width="100%"
                                    height="315"
                                    videoid={getYouTubeVideoId(
                                        selectedVideo.url
                                    )}
                                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                                        selectedVideo.url
                                    )}`}
                                    title="YouTube video player"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        )}
                    </div>
                    <div className="w-full mt-4">
                        {videos.map((video) => (
                            <div
                                key={video._id}
                                className="cursor-pointer mb-2 p-2 bg-gray-200 hover:bg-gray-300"
                                onClick={() => handleVideoSelection(video)}
                            >
                                <p className="text-blue-500">{video.url}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};
