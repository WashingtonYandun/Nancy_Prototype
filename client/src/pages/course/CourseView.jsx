import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCourses } from '../../context/courseContext';


export const CourseView = () => {
    const { id } = useParams(); // Obtiene el ID del curso de la URL
    const { getCourse } = useCourses();
    const [courseDetails, setCourseDetails] = useState(null);

    useEffect(() => {
        const loadCourse = async () => {
            const data = await getCourse(id);
            setCourseDetails(data);
        };
        loadCourse();
    }, [id, getCourse]);

    return (
        <div className="bg-amber-500">
            {courseDetails ? (
                <div>
                    <h1>Holaaaaaa</h1>
                    <h1>{courseDetails.title}</h1>
                    <h1>{courseDetails.description}</h1>
                    <h1>{courseDetails.language}</h1>
                    <h1>{courseDetails.category}</h1>
                    <h1>{courseDetails.subcategory}</h1>

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}