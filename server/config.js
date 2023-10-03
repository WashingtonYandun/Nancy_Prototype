const PORT = process.env.PORT || 3000;
const TOKEN_SECRET = process.env.TOKEN_SECRET || "Spiderman<3";
const TOKEN_EXPIRES = process.env.TOKEN_EXPIRES || "4d";
const NODE_ENV = process.env.NODE_ENV || "development";
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/nancydb";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:8080";

export {
    PORT,
    TOKEN_SECRET,
    TOKEN_EXPIRES,
    NODE_ENV,
    MONGODB_URI,
    FRONTEND_URL,
};
