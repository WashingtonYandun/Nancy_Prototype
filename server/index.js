import { app } from "./app.js";
import { connectDb } from "./db.js";

await connectDb();
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});
