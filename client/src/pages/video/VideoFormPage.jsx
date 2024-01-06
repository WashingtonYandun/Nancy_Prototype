import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Input } from "../../components/ui";
import { Textarea } from "../../components/ui/Textarea";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useVideo } from "../../context/videoContext";
import { Navbar } from "../../components/general/Navbar.jsx";

export const VideoFormPage = () => {
    const { videos, createVideo, getVideo, updateVideo } = useVideo();
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
            if (!data.title || !data.description || !data.url) {
                return alert("Please fill all the required fields");
            }

            if (params.id) {
                updateVideo(params.id, {
                    ...data,
                    classification,
                });
            } else {
                createVideo({
                    ...data,
                    classification,
                });
            }
            console.log(data);
            navigate("/admin/videos");
        } catch (error) {
            console.error("Error submitting", error, data);
        }
    };

    const fetchCategory = async (title) => {
        if (title) {
            try {
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
                    console.error("Error using Classifier API", response);
                }
            } catch (error) {
                console.error("Error getting classification:", error);
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
        const loadVideo = async () => {
            console.log(params);
            if (params.id) {
                const video = await getVideo(params.id);

                setValue("title", video.title);
                setValue("description", video.description);
                setValue("url", video.url);
            }
        };
        loadVideo();
    }, [params.id, getVideo, setValue]);

    return (
        <>
            <Navbar></Navbar>

            <div className="max-w-md mx-auto my-10 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-700 mb-2">
                    Video Form
                </h1>
                <p className="text-gray-600 mb-4">
                    Fill the form to create a new video.
                </p>

                {/* Video Form Section */}
                <Card className="h-full w-full max-w-xl p-6 bg-gray-800 text-white rounded-md shadow-md h-[10vh]">
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

                        <Textarea
                            name="description"
                            id="description"
                            rows="4"
                            placeholder="Description"
                            {...register("description")}
                            className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3 h-[20vh]"
                        />

                        <div className="flex flex-column">
                            <Input
                                type="text"
                                name="url"
                                placeholder="URL"
                                {...register("url")}
                                className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3"
                            />
                            {errors.url && (
                                <p className="text-error">
                                    Please enter a URL.
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className=" w-full bg-accent text-white p-2 rounded-lg hover:bg-accent"
                        >
                            Save
                        </button>
                    </form>
                </Card>
            </div>
        </>
    );
};
