import { TOKEN_SECRET, TOKEN_EXPIRATION } from "../config.js";
import jwt from "jsonwebtoken";

/**
 * Creates an access token using the provided payload.
 * @param {Object} payload - The payload to be included in the access token.
 * @returns {Promise<string>} - A promise that resolves to the generated access token.
 */
export async function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            { expiresIn: TOKEN_EXPIRATION },
            (err, token) => {
                if (err) reject(err);
                resolve(token);
            }
        );
    });
}
