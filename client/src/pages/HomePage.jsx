import { Link } from "react-router-dom";

function HomePage() {
    return (
        <section className=" flex justify-around h-full flex-col">
            <header className="flex justify-around items-center h-full p-10 flex-col">
                <h1 className="text-5xl py-2 font-bold">Nancy</h1>
                <p className="text-md text-slate-400">
                    Nancy Prototype is a robust Learning Management System (LMS)
                    designed to enhance your learning experience through the
                    integration of cutting-edge technologies. Leveraging
                    Mediapipe, computer vision, and artificial intelligence
                    powered by OpenAI, this system goes beyond traditional
                    approaches to offer a more interactive and personalized
                    learning journey.
                </p>

                <Link
                    className="bg-[#386641] px-4 py-2 rounded-md mt-4 inline-block"
                    to="/register"
                >
                    Go lo learn
                </Link>
            </header>
        </section>
    );
}

export default HomePage;
