import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import { globalErrorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

app.use(globalErrorHandler);

export default app;
