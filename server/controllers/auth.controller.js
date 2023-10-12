// auth.controller.js
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { TOKEN_SECRET, NODE_ENV } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import { User } from "../models/user.model.js";

class AuthController {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            const userFound = await User.findOne({ email });

            if (userFound)
                return res.status(400).json({
                    message: ["The email is already in use"],
                });

            const passwordHash = await bcrypt.hash(password, 8);
            const newUser = new User({
                username,
                email,
                password: passwordHash,
            });

            const userSaved = await newUser.save();
            const token = await createAccessToken({ id: userSaved._id });

            res.cookie("token", token, {
                httpOnly: NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
            });

            res.json({
                id: userSaved._id,
                username: userSaved.username,
                email: userSaved.email,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const userFound = await User.findOne({ email });

            if (!userFound)
                return res.status(400).json({
                    message: ["The email does not exist"],
                });

            const isMatch = await bcrypt.compare(password, userFound.password);

            if (!isMatch) {
                return res.status(400).json({
                    message: ["The password is incorrect"],
                });
            }

            const token = await createAccessToken({
                id: userFound._id,
                username: userFound.username,
            });

            res.cookie("token", token, {
                httpOnly: process.env.NODE_ENV !== "development",
                secure: true,
                sameSite: "none",
            });

            res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async verifyToken(req, res) {
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.sendStatus(401);

            const userFound = await User.findById(user.id);
            if (!userFound) return res.sendStatus(401);

            return res.json({
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
            });
        });
    }

    async logout(req, res) {
        res.cookie("token", "", {
            httpOnly: true,
            secure: true,
            expires: new Date(0),
        });
        return res.sendStatus(200);
    }
}

export default new AuthController();
