import express from "express";
import { corsMiddleware } from "./config/index.js";
import { errorHandler, requestLogger } from "./middleware/index.js";
import { aiRouter, lessonRouter, userRouter } from "./modules/index.js";

const app = express();

app.use(corsMiddleware);
app.use(requestLogger);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, data: { status: "ok", service: "bloom-backend" } });
});

app.use("/api/users", userRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/ai", aiRouter);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: "Route is not found" });
});

app.use(errorHandler);

export default app;
