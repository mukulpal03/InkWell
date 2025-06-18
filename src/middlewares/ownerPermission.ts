import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import ApiError from "../utils/apiError";
import Comment from "../models/comment";

export const isPostOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  const userId = req.user._id;

  try {
    const post: any = await Post.findById(postId);

    if (!post) return next(new ApiError(404, "Post not found"));

    if (post.user.toString() !== userId)
      return next(
        new ApiError(403, "You are not authorized to perform this action")
      );

    next();
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    return next(new ApiError(500, error.message ?? "Internal server error"));
  }
};

export const isCommentOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const commentId = req.params.id;
  const userId = req.user._id;

  try {
    const comment: any = await Comment.findById(commentId);

    if (!comment) return next(new ApiError(404, "Comment not found"));

    if (comment.user.toString() !== userId)
      return next(
        new ApiError(403, "You are not authorized to perform this action")
      );

    next();
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    return next(new ApiError(500, error.message ?? "Internal server error"));
  }
};
