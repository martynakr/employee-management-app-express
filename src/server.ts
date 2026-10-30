import app from "./app.js";
import { connectDatabase } from "./config/database.js";

const port = parseInt(process.env.port || "3000");

async function startServer(): Promise<void> {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`Express is running on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exitCode = 1;
    }
}

startServer();
