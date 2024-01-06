import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCourses } from "../../context/courseContext";
import { Navbar } from "../../components/general/Navbar.jsx";

export const CourseFormPage = () => {
    const { createCourse } = useCourses();
    const navigate = useNavigate();
    const [classification, setClassification] = useState(null);
    const [subclassification, setSubclassification] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState("en");
    const languages = ["en", "es", "fr", "it", "gr"];
    const [tags, setTags] = useState([]);
    const [requirements, setRequirements] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleTags = (value) => {
        const tagsArray = value.split(",");
        setTags(tagsArray);
    };

    const handleRequirements = (value) => {
        const requirementsArray = value.split(",");
        setRequirements(requirementsArray);
    };

    const onSubmit = async (data) => {
        try {
            if (!data.title || !data.description || !data.thumbnail) {
                return alert("Please fill all the required fields");
            }

            data.classification = classification;
            data.subclassification = subclassification;
            data.language = selectedLanguage;
            data.tags = tags;
            data.requirements = requirements;

            createCourse(data);
            navigate("/courses");
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
                    setSubclassification(mydata);
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
                        <div>
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                                {...register("title")}
                                autoFocus
                                onChange={handleTitleChange}
                            />
                            {errors.title && (
                                <p className="text-red-500 text-xs italic">
                                    Please enter a title.
                                </p>
                            )}
                        </div>

                        <textarea
                            name="description"
                            placeholder="Description"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                            {...register("description")}
                        />

                        <textarea
                            name="thumbnail"
                            placeholder="Thumbnail"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                            {...register("thumbnail")}
                        />

                        <input
                            type="text"
                            name="requirements"
                            placeholder="requirements"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                            {...register("requirements")}
                            onChange={(e) => handleRequirements(e.target.value)}
                        />
                        {/* TODO: Add a list of requirements */}

                        <input
                            type="text"
                            name="tags"
                            placeholder="tags"
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                            {...register("tags")}
                            onChange={(e) => handleTags(e.target.value)}
                        />
                        {/* TODO: Add a list of tags */}

                        <select
                            name="language"
                            value={selectedLanguage}
                            onChange={(e) =>
                                setSelectedLanguage(e.target.value)
                            }
                            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"
                        >
                            {languages.map((language) => (
                                <option key={language} value={language}>
                                    {language}
                                </option>
                            ))}
                        </select>

                        <button
                            type="submit"
                            className="w-full bg-accent text-white p-2 rounded-lg hover:bg-accent"
                        >
                            Save
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};
