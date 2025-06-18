import { Request, Response } from "express";
import {
  getAllComments,
  validateAndCreateComment,
  validateAndDeleteComment,
  validateAndUpdateComment,
} from "../services/comment";
import ApiResponse from "../utils/apiResponse";

export const getPostComments = async (req: Request, res: Response) => {
  const postId = req.params.postId;

  const comments = await getAllComments(postId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comments fetched successfully", comments));
};

export const createPostComment = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const content = req.body.content;
  const userId = req.user._id;

  const comment = await validateAndCreateComment(postId, userId, content);

  return res
    .status(201)
    .json(new ApiResponse(201, "Comment created successfully", comment));
};

export const updatePostComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;
  const content = req.body.content;

  const comment = await validateAndUpdateComment(commentId, content);

  return res
    .status(200)
    .json(new ApiResponse(200, "Comment updated successfully", comment));
};

export const deletePostComment = async (req: Request, res: Response) => {
  const commentId = req.params.id;

  await validateAndDeleteComment(commentId);

  return res.status(204).send();
};
