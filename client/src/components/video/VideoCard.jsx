import { Card } from "../ui";
import { useVideo } from "../../context/videoContext";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";

export const VideoCard = ({ video }) => {
    const { user, isAuthenticated } = useAuth();
    const { deleteVideo } = useVideo();

    const getYouTubeVideoId = (url) => {
        const youtubeRegex =
            /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;

        const match = url.match(youtubeRegex);
        return match ? match[1] : null;
    };

    return (
        <Card className="p-6 bg-secondary rounded-md shadow-md">
            <header className="flex justify-between mb-4 truncate">
                <h1 className="text-1xl font-bold text-text truncate">
                    {video.title}
                </h1>
            </header>

            <div className="w-100 flex justify-center itemscenter">
                <iframe
                    width="400"
                    height="200"
                    videoid={getYouTubeVideoId(video.url)}
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                        video.url
                    )}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                ></iframe>
            </div>

            <div className="flex items-center space-x-2">
                {isAuthenticated && user.role === "admin" ? (
                    <>
                        <Link
                            to="/admin/edit-video"
                            className="flex-1 my-2 mt-4 bg-accent hover:bg-accent hover:rounded-2xl text-black font-bold py-2 px-4 rounded"
                        >
                            Edit
                        </Link>

                        <Link
                            onClick={() => deleteVideo(video._id)}
                            className="flex-1 my-2 mt-4 bg-accent hover:bg-accent hover:rounded-2xl text-black font-bold py-2 px-4 rounded"
                        >
                            Delete
                        </Link>
                    </>
                ) : (
                    <Link
                        to={`/courses/${video.courseId}`}
                        className="bg-accent hover:bg-joy"
                    >
                        View Course
                    </Link>
                )}
            </div>
        </Card>
    );
};
