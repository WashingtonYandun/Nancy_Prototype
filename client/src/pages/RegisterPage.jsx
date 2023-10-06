import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "../components/Footer";

function Register() {
    const { signup, errors: registerErrors, isAuthenticated } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (value) => {
        await signup(value);
    };

    useEffect(() => {
        if (isAuthenticated) navigate("/notes");
    }, [isAuthenticated]);

    return (
        <>
            <div className="flex justify-center items-center h-screen bg-bright">
                <Card className="w-full max-w-md p-8">
                    {registerErrors.map((error, i) => (
                        <Message message={error} key={i} />
                    ))}
                    <h1 className="text-3xl font-bold mb-6">
                        Register to Nancy
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                type="text"
                                name="username"
                                placeholder="Write your username"
                                {...register("username")}
                                autoFocus
                            />
                            {errors.username?.message && (
                                <p className="text-error text-xs">
                                    {errors.username?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                name="email"
                                placeholder="example@youremail.com"
                                {...register("email")}
                            />
                            {errors.email?.message && (
                                <p className="text-error text-xs">
                                    {errors.email?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                type="password"
                                name="password"
                                placeholder="Minimum 6 characters"
                                {...register("password")}
                            />
                            {errors.password?.message && (
                                <p className="text-error text-xs">
                                    {errors.password?.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <Label htmlFor="confirmPassword">
                                Confirm Password
                            </Label>
                            <Input
                                type="password"
                                name="confirmPassword"
                                placeholder="********"
                                {...register("confirmPassword")}
                            />
                            {errors.confirmPassword?.message && (
                                <p className="text-error text-xs">
                                    {errors.confirmPassword?.message}
                                </p>
                            )}
                        </div>

                        <Button className="w-full">Submit</Button>
                    </form>

                    <p className="text-center mt-4">
                        <span className="block">Do you have an Account?</span>
                        <Link className="text-darkAccent" to="/login">
                            Login
                        </Link>
                    </p>
                </Card>
            </div>
            <Footer />
        </>
    );
}

export default Register;
