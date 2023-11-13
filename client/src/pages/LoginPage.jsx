import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Button, Input, Label } from "../components/ui";
import { loginSchema } from "../schemas/auth";
import Footer from "../components/Footer";

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

        // Check if the user is authenticated and has the "admin" role
        if (isAuthenticated && user && user.role === "admin") {
            navigate("/admin/users");
        } else {
            navigate("/notes");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            // If the user is already authenticated, redirect based on the role
            if (user && user.role === "admin") {
                navigate("/admin/users");
            } else {
                navigate("/notes");
            }
        }
    }, [isAuthenticated, user, navigate]);

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
                <Card className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white">
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

                        <Button className="w-full bg-darkAccent hover:bg-darkAccentHover text-white hover:text-darkAccent">
                            Login
                        </Button>
                    </form>

                    <p className="text-center mt-4">
                        <span className="block text-darkAccent">
                            Don't have an account?{" "}
                        </span>
                        <Link to="/register" className="text-darkAccent">
                            Sign up
                        </Link>
                    </p>
                </Card>
            </div>
            <Footer />
        </>
    );
}
