import { Link } from "react-router-dom";
import nancyLogo from "../../assets/nancy_logo.png";
import { Footer } from "../../components/Footer";

export const HomePage = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row justify-center items-center bg-bright min-h-screen">
                <section className="text-center md:text-left md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold text-text mb-4">Nancy</h1>
                    <p className="text-lg text-text mb-8">
                        Nancy Prototype is a robust Learning Management System
                        (LMS) powered with AI
                    </p>

                    <Link
                        className="px-6 py-3 bg-accent text-white rounded-full hover:bg-joy transition duration-300"
                        to="/register"
                    >
                        Go to Learn
                    </Link>
                </section>

                <section className="md:w-1/2 p-8">
                    <img
                        src={nancyLogo}
                        alt="Nancy Logo"
                        className="mx-auto rounded-full"
                    />
                </section>
            </div>
            <Footer />
        </>
    );
};
