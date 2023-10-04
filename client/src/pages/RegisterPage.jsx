import { useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Card, Message, Button, Input, Label } from "../components/ui";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

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
        <div className="h-[calc(100vh-100px)] flex items-center justify-center">
            <Card>
                {registerErrors.map((error, i) => (
                    <Message message={error} key={i} />
                ))}
                <h1 className="text-3xl font-bold mb-3">Register to Nancy</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Label htmlFor="username">Username</Label>
                    <Input
                        type="text"
                        name="username"
                        placeholder="Write your username"
                        {...register("username")}
                        autoFocus
                    />
                    {errors.username?.message && (
                        <p className="text-red-500">
                            {errors.username?.message}
                        </p>
                    )}

                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        placeholder="example@youremail.com"
                        {...register("email")}
                    />
                    {errors.email?.message && (
                        <p className="text-red-500">{errors.email?.message}</p>
                    )}

                    <Label htmlFor="password">Password</Label>
                    <Input
                        type="password"
                        name="password"
                        placeholder="Minimum 6 characters"
                        {...register("password")}
                    />
                    {errors.password?.message && (
                        <p className="text-red-500">
                            {errors.password?.message}
                        </p>
                    )}

                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="********"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword?.message && (
                        <p className="text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                    <Button>Submit</Button>
                </form>
                <p className="flex justify-center w-full flex-col content-center gap-x-2 gap-y-2">
                    <span className="content-center">
                        Do you have an Account?
                    </span>
                    <Link className="text-sky-500 content-center" to="/login">
                        Login
                    </Link>
                </p>
            </Card>
        </div>
    );
}

export default Register;
