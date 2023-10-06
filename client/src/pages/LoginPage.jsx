import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, Message, Button, Input, Label } from "../components/ui";
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
    const { signin, errors: loginErrors, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const onSubmit = (data) => signin(data);

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/notes");
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-bright">
                <Card className="w-full max-w-md p-8">
                    {loginErrors.map((error, i) => (
                        <Message message={error} key={i} />
                    ))}
                    <h1 className="text-3xl font-bold mb-6">Login</h1>

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="example@youremail.com"
                                {...register("email", { required: true })}
                            />
                            <p className="text-error text-xs">
                                {errors.email?.message}
                            </p>
                        </div>

                        <div>
                            <Label htmlFor="password">Password:</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Write your password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                })}
                            />
                            <p className="text-error text-xs">
                                {errors.password?.message}
                            </p>
                        </div>

                        <Button className="w-full">Login</Button>
                    </form>

                    <p className="text-center mt-4">
                        <span className="block">Don't have an account? </span>
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
