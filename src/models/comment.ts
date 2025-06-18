import mongoose from "mongoose";
import { IComment } from "../types";

const commentSchema = new mongoose.Schema<IComment>(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model<IComment>("Comment", commentSchema);

export default Comment;
