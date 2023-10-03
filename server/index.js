import { app } from "./app.js";
import { PORT, NODE_ENV } from "./config.js";
import { connectDb } from "./db.js";

// start server
async function main() {
    try {
        await connectDb();
        app.listen(PORT);

        console.log(`Listening on port ${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error(error);
    }
}

main();
