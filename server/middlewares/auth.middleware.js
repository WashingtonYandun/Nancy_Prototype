import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { TOKEN_SECRET } from "../config.js";

/**
 * Middleware function to authenticate requests using a token.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Object} - The response object.
 */
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

/**
 * Middleware function to verify the role of a user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<void>} - A Promise that resolves when the middleware is complete.
 */
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
