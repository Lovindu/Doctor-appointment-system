import { createServer } from "./utils/server.js";
import connectDB from "./config/mongodb.js";
const app = createServer();

connectDB(process.env.MONGO).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Backend is running on port ${process.env.PORT}`);
    });
});

export { app };
