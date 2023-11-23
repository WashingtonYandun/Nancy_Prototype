import { useEffect } from "react";
import { ButtonLink } from "../../components/ui/ButtonLink";
import { useState } from "react";

import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useVideo } from "../../context/videoContext";
import { VideoCard } from "../../components/admin/video/VideoCard";
import { Dropdown } from "../../components/Dropdown";

export function VideosPage() {
    const { videos, getVideos } = useVideo();

    const categories = [
        "Technology",
        "Science",
        "Software Development",
        "Business",
        "Art & Design",
        "Teaching & Academics",
        "Personal Development",
        "Health & Fitness",
        "Lifestyle",
    ];

    const [filteredCategory, setFilteredCategory] = useState(null);

    const handleCategoryChange = (category) => {
        setFilteredCategory(category);
    };

    const filteredVideos = filteredCategory
        ? videos.filter(
              (video) => video.classification.category === filteredCategory
          )
        : videos;

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <Navbar />

            <div className="flex flex-row  px-20 py-5 justify-end items-center bg-dark text-white">
                <Dropdown
                    categories={categories}
                    onSelectCategory={handleCategoryChange}
                    selectedCategory={filteredCategory}
                ></Dropdown>
            </div>

            <div className="container mx-auto my-8 px-4 min-h-screen">
                {videos.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                        <h2 className="font-bold text-xl text-center mt-4">
                            No videos yet, please start session
                            <ButtonLink to="/admin/add-video">
                                Upload new Video
                            </ButtonLink>
                        </h2>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredVideos.map((video) => (
                            <VideoCard video={video} key={video._id} />
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
