import jwt from "jsonwebtoken";
import { User } from "../models/user/user.model.js";
import { TOKEN_SECRET } from "../config.js";

export const auth = (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token)
            return res
                .status(401)
                .json({ message: "No token, authorization denied" });

        jwt.verify(token, TOKEN_SECRET, (error, user) => {
            if (error) {
                return res.status(401).json({ message: "Token is not valid" });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const verifyRole = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) return res.send(false);

        jwt.verify(token, TOKEN_SECRET, async (error, user) => {
            if (error) return res.sendStatus(401);

            const userFound = await User.findById(user.id);
            if (!userFound) return res.sendStatus(401);

            if (userFound.role === "admin") return next();

            return res.send(false);
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
