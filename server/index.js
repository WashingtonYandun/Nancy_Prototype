import { app } from "./app.js";
import { PORT, NODE_ENV } from "./config.js";
import { connectDb } from "./db.js";

async function init() {
    try {
        await connectDb();
        app.listen(PORT);

        console.log(`<<Listening on port http://localhost:${PORT}>>`);
        console.log(`<<Environment: ${NODE_ENV}>>`);
    } catch (error) {
        console.log("Error");
        console.error(error);
    }
}

init().then(r => console.log(">>Init done<<"));
