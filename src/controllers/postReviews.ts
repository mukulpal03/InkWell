import { Request, Response } from "express";
import {
  getPendingPosts,
  validateAndApprovePost,
  validateAndRejectPost,
} from "../services/postReviews";
import ApiResponse from "../utils/apiResponse";

export const getAllPendingPosts = async (req: Request, res: Response) => {
  const posts = await getPendingPosts();

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully", posts));
};

export const approvePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const comment = req.body?.comment;

  const post = await validateAndApprovePost(postId, comment);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post approved successfully", post));
};

export const rejectPost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const comment = req.body?.comment;

  const post = await validateAndRejectPost(postId, comment);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post rejected successfully", post));
};
