import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/general/Navbar";
import { Footer } from "../../components/general/Footer";
import { useCourses } from "../../context/courseContext";
import {Link} from "react-router-dom";

export function CoursesPage() {
    const { courses, getCourses } = useCourses();

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
              (course) => course.category.category === filteredCategory
          )
        : courses;

    useEffect(() => {
        getCourses();
    }, []);

    return (
        <>
            <Navbar />

            <div className="container mx-auto my-8 px-4 min-h-screen">
                {courses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                        <h2 className="font-bold text-xl text-center mb-4">
                            No courses yet, create one!
                        </h2>
                    </div>
                ) : (
                    <div className="">
                        {filteredCourses.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-10 bg-dark text-white rounded-md">
                                <h2 className="font-bold text-xl text-center mb-4">
                                    No courses in the selected category
                                </h2>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="col-span-1"
                                    >
                                        <div className="bg-dark text-white rounded-md shadow-md p-6">
                                            <h2 className="font-bold text-xl">
                                                {course.title || "No title"}
                                            </h2>
                                            <p className="text-gray-400">
                                                {course.description || "No description"}
                                            </p>
                                            <p className="text-gray-400">
                                                {course.language || "No language"}
                                            </p>
                                            <p className="text-gray-400">
                                                {course.thumbnail || "No thumbnail"}
                                            </p>
                                        </div>

                                        <Link to={`/course/${course._id}`}>
                                            <button className="bg-dark text-white rounded-md shadow-md p-2 mt-2">
                                                View course
                                            </button>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}
