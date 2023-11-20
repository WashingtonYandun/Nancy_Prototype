import { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Footer } from "../../components/Footer";
import nancyLogo from "../../assets/nancy_logo.png";

export const RegisterPage = () => {
    const { signup, errors: registerErrors, isAuthenticated, user } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(registerSchema),
    });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        await signup(data);
    };

    useEffect(() => {
        if (isAuthenticated) {
            console.log(user, user.role);

            // Check if the user is authenticated
            if (isAuthenticated) {
                // If the user has the "admin" role, redirect to /admin/users
                if (user && user.role === "admin") {
                    navigate("/admin/users");
                } else {
                    // If the user doesn't have the "admin" role, redirect to /notes
                    navigate("/notes");
                }
            }
        }
    }, [isAuthenticated]);

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row p-8 justify-evenly items-center bg-bright min-h-screen ">
                <section className="w-1/3 md:w-1/4 p-2">
                    <img
                        src={nancyLogo}
                        alt="Nancy Logo"
                        className="mx-auto rounded-full"
                    />
                </section>

                <Card className="md:w-2/3 p-8 w-full max-w-md p-8">
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

                        <div>
                            <Label>Role</Label>
                            <div>
                                <input
                                    type="radio"
                                    id="user"
                                    value="user"
                                    {...register("role")}
                                />
                                <label htmlFor="user" className="ml-2">
                                    User
                                </label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    id="admin"
                                    value="admin"
                                    {...register("role")}
                                />
                                <label htmlFor="admin" className="ml-2">
                                    Admin
                                </label>
                            </div>
                            {errors.role?.message && (
                                <p className="text-error text-xs">
                                    {errors.role?.message}
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
};
