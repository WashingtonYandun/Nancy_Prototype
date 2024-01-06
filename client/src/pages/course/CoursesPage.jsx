import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/general/Navbar";
import { useCourses } from "../../context/courseContext";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { Dropdown } from "../../components/general/Dropdown.jsx";

export function CoursesPage() {
    const { courses, getCourses } = useCourses();
    const { user } = useAuth();

    const getYouTubeVideoId = (url) => {
        const youtubeRegex =
            /^(?:(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11}))/;

        const match = url.match(youtubeRegex);
        return match ? match[1] : null;
    };

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

    const filteredCourses = filteredCategory
        ? courses.filter(
              (course) => course.classification.category === filteredCategory
          )
        : courses;

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            <Navbar />

            <div className="flex flex-row border-b-2 bg-teal-50 justify-between items-center text-white py-2 px-4">
                <Dropdown
                    categories={categories}
                    onSelectCategory={handleCategoryChange}
                    selectedCategory={filteredCategory}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {courses.length === 0 ? (
                    <div className="text-center py-10">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No courses yet, create one!
                        </h2>
                    </div>
                ) : (
                    <div>
                        {filteredCourses.length === 0 ? (
                            <div className="text-center py-10">
                                <h2 className="text-xl font-semibold text-gray-800">
                                    No courses in the selected category
                                </h2>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredCourses.map((course) => (
                                    <Link
                                        to={`/courses/${course._id}`}
                                        key={course._id}
                                        className="bg-white rounded-lg shadow overflow-hidden flex"
                                    >
                                        <div className="flex-1 p-6">
                                            <h2 className="text-lg font-semibold text-gray-800 mb-2">
                                                {course.title || "No title"}
                                            </h2>
                                            <p className="text-sm text-gray-600 mb-4">
                                                {course.description ||
                                                    "No description"}
                                            </p>

                                            <div className="text-sm text-gray-500">
                                                <p>
                                                    {course.language ||
                                                        "No language"}
                                                </p>
                                                <p>
                                                    {course.thumbnail ||
                                                        "No thumbnail"}
                                                </p>
                                                <p className="mb-3">
                                                    {course.classification
                                                        .category ||
                                                        "No category"}
                                                </p>
                                            </div>

                                            {user.role === "admin" && (
                                                <Link
                                                    className="my-2 mt-4 bg-accent hover:bg-accent hover:rounded-2xl text-black font-bold py-2 px-4 rounded"
                                                    to={`/courses/edit-course/${course._id}`}
                                                >
                                                    Edit Course
                                                </Link>
                                            )}
                                        </div>
                                        {course.videos &&
                                            course.videos.length > 0 && (
                                                <div className="flex-1">
                                                    <iframe
                                                        src={
                                                            course.videos[0].url
                                                        }
                                                        width="100%"
                                                        height="100%"
                                                        title="Course Video"
                                                        className="rounded-r-lg"
                                                    ></iframe>
                                                </div>
                                            )}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
