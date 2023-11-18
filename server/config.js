const PORT = process.env.PORT || 3000;
const MONGODB_URI =
    process.env.MONGODB_URI ||
    "mongodb+srv://wmym:wmym@nancydb.cbmurct.mongodb.net/?retryWrites=true&w=majority";
const TOKEN_SECRET = process.env.TOKEN_SECRET || "Spiderman";
const TOKEN_EXPIRATION = process.env.TOKEN_EXPIRATION || "5d";

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const NODE_ENV = process.env.NODE_ENV || "development";

export {
    PORT,
    MONGODB_URI,
    TOKEN_SECRET,
    TOKEN_EXPIRATION,
    FRONTEND_URL,
    NODE_ENV,
};
