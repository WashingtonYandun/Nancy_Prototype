import { z } from "zod";

// aditional validations can be added here (mongo validations are also made)
const registerSchema = z.object({
    username: z.string({
        required_error: "Username is required",
    }),
    email: z
        .string({
            required_error: "Email is required",
        })
        .email({
            message: "Email is not valid",
        }),
    password: z
        .string({
            required_error: "Password is required",
        })
        .min(6, {
            message: "Password must be at least 6 characters",
        }),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

export { registerSchema, loginSchema };
