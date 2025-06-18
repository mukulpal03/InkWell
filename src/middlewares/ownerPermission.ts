import { NextFunction, Request, Response } from "express";
import Post from "../models/post";
import ApiError from "../utils/apiError";

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
