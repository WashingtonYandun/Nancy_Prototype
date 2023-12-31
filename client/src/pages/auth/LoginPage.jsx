import { useAuth } from "../../context/authContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Input, Label } from "../../components/ui";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../../schemas/auth";
import { Footer } from "../../components/general/Footer";
import nancyLogo from "../../assets/nancy_logo.png";
import { Navbar } from "../../components/general/Navbar.jsx";

export function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });
    const { signin, errors: loginErrors, isAuthenticated, user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await signin(data);
    };

    useEffect(() => {
        if (isAuthenticated) {
            // If the user is already authenticated, redirect based on the role
            if (user && user.role === "admin") {
                navigate("/admin/users");
            } else {
                navigate("/courses");
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <>
            <Navbar></Navbar>

            <div className="min-h-screen flex flex-col md:flex-row p-8 justify-evenly items-center bg-bright">
                <section className="w-1/3 md:w-1/4 p-2">
                    <img
                        src={nancyLogo}
                        alt="Nancy Logo"
                        className="mx-auto rounded-full"
                    />
                </section>

                <Card className="bg-white w-full max-w-md p-8 rounded-lg shadow-lg">
                    <h1 className="text-3xl font-semibold text-center mb-6 text-darkAccent">
                        Login
                    </h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="email" className="text-darkAccent">
                                Email
                            </Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="example@youremail.com"
                                {...register("email", { required: true })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <p className="text-error text-xs">
                                {errors.email?.message}
                            </p>
                        </div>

                        <div>
                            <Label
                                htmlFor="password"
                                className="text-darkAccent"
                            >
                                Password:
                            </Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Write your password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                })}
                                className="w-full px-4 py-2 border rounded-lg"
                            />
                            <p className="text-error text-xs">
                                {errors.password?.message}
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="my-2 w-full bg-accent text-white p-1 rounded-lg hover:bg-accent"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center my-2">
                        <span className="block text-darkAccent">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            to="/register"
                            className="my-2 w-full text-darkAccent p-1 rounded-lg"
                        >
                            Sign up
                        </Link>
                    </p>
                </Card>
            </div>
            <Footer />
        </>
    );
}
