import { Button, Card } from "../../ui";
import { useVideo } from "../../../context/videoContext";
import YouTube from "react-youtube";

export const VideoCard = ({ video }) => {
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
                <h1 className="text-2xl font-bold text-text truncate">
                    {video.title}
                </h1>

                <p className="text-sm font-bold text-text">
                    {video.description}
                </p>

                <span className="text-sm font-bold text-text"></span>
            </header>

            <div className=" w-100 flex justify-center itemscenter">
                <YouTube
                    className="px-2 py-2"
                    videoId={getYouTubeVideoId(video.url)}
                    opts={{
                        width: "100%",
                    }}
                />
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    onClick={() => deleteVideo(video._id)}
                    className="bg-error hover:bg-joy"
                >
                    Delete
                </Button>
            </div>
        </Card>
    );
};
