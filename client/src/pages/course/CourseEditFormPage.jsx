import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCourses } from "../../context/courseContext";
import { useVideo } from "../../context/videoContext.jsx";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Navbar} from "../../components/general/Navbar.jsx";

export const CourseEditFormPage = () => {
    const { id } = useParams();
    const { videos, getVideos } = useVideo();
    const { updateCourse } = useCourses();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleTags = (value) => {
        const tagsArray = value.split(",");
        setTags(tagsArray);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            data.tags = tags;

            if (selectedVideo) {
                data.videos = [...videos, selectedVideo];
            }

            updateCourse(id, data);
            navigate("/courses");
        } catch (error) {
            console.error("Error submitting", error, data);
        }
    };

    useEffect(() => {
        getVideos();
    }, []);

    return (
        <>
            <Navbar></Navbar>

            <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
                <div>
                    <h1 className="text-2xl font-bold text-gray-700 mb-2">
                        Course Form
                    </h1>
                    <p className="text-gray-600 mb-4">
                        Fill the form to create a new course.
                    </p>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <input
                            type="text"
                            name="tags"
                            placeholder="tags"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            {...register("tags")}
                        />
                        {/* TODO: Add a list of tags */}

                        <button
                            type="submit"
                            className="w-full bg-accent text-white p-2 rounded-lg hover:bg-accent"
                        >
                            Save
                        </button>
                    </form>
                </div>

                {/* Agregar campo de selección para videos */}
                <div>
                    <label htmlFor="videos">Select Videos:</label>
                    <select
                        name="videos"
                        id="videos"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                        {...register("videos")}
                    >
                        {videos.map((video) => (
                            <option key={video._id} value={video._id}>
                                {video.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

        </>
    );
};
