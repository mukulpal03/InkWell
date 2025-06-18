import mongoose from "mongoose";
import { IPostReview } from "../types";

const postReviewSchema = new mongoose.Schema<IPostReview>(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

const PostReview = mongoose.model<IPostReview>("PostReview", postReviewSchema);

export default PostReview;
