import jwt from "jsonwebtoken";
import { TOKEN_SECRET, TOKEN_EXPIRES } from "../config.js";

async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRES },
            (error, token) => {
                if (error) {
                    reject(error);
                }
                resolve(token);
            }
        );
    });
}

export { createAccessToken };
