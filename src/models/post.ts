import mongoose from "mongoose";
import { IPost } from "../types";
import { availablePostStatus, postStatusEnum } from "../utils/constants";

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: availablePostStatus,
      default: postStatusEnum.PENDING,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export default Post;
