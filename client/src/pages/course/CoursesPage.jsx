import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar } from "../../components/general/Navbar";
import { Footer } from "../../components/general/Footer";
import { useCourses } from "../../context/courseContext";

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
                            No courses yet
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
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredCourses.map((course) => (
                                    <div
                                        key={course._id}
                                        className="col-span-1"
                                    >
                                        a
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
