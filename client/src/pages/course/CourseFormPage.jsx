import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Textarea } from "../../components/ui";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useCourses } from "../../context/courseContext"; // Make sure to import the correct context

export const CourseFormPage = () => {
    const { createCourse } = useCourses();
    const navigate = useNavigate();

    const [classification, setClassification] = useState(null);

    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            if (!data.title || !data.description) {
                return alert("Please fill all the required fields");
            }

            if (classification) {
                data.category = classification.category;
                data.subcategory = classification.matches;
            }

            createCourse(data);
            navigate("/admin/courses");
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

    return (
        <>
            <div className="grid grid-cols-2 h-screen">
                <div className="read-section bg-gray-200 h-[10vh]"></div>

                {/* Course Form Section */}
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

                        <Textarea
                            name="description"
                            id="description"
                            rows="4"
                            placeholder="Description"
                            {...register("description")}
                            className="w-full bg-gray-700 text-white rounded border-none focus-outline-none py-2 px-3 h-[20vh]"
                        />

                        <Button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded focus-outline-none"
                        >
                            Save
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
};
