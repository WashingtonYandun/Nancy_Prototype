const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/nancy_web";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "Spiderman";
const NODE_ENV = process.env.NODE_ENV || "development";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";
export const PORT = process.env.PORT || 3000;

export { MONGODB_URI, TOKEN_SECRET, NODE_ENV, FRONTEND_URL };
