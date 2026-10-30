import sourceMapSupport from "source-map-support";
import express, { type Request, type Response } from "express";
import cors from "cors";
import morgan from "morgan";
import apiRoutes from "./routes/api.routes.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";
import { errorHandler } from "./middleware/error-handler.js";

sourceMapSupport.install();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
    }),
);
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok" });
});

app.use("/api", apiRoutes);
app.use(errorHandler);

export default app;
