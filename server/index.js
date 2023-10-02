import { app } from "./app.js";
import { connectDb } from "./db.js";
import { PORT } from "./config.js";

await connectDb();

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
