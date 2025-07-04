import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user";
import postRoutes from "./routes/post";
import postReviewRoutes from "./routes/postReviews";
import commentRoutes from "./routes/comment";
import categoryRoutes from "./routes/category";
import { globalErrorHandler } from "./utils/errorHandler";
import { limiter } from "./middlewares/limitter";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use(limiter);

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/admin/posts", postReviewRoutes);
app.use("/api/v1/posts/:postId/comments", commentRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.use(globalErrorHandler);

export default app;
