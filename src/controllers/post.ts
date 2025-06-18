import { Request, Response } from "express";
import {
  getAllPublishedPosts,
  getPostById,
  validateAndCreatePost,
  validateAndDeletePost,
  validateAndUpdatePost,
} from "../services/post";
import ApiResponse from "../utils/apiResponse";

export const createPost = async (req: Request, res: Response) => {
  const postData = req.body;
  const userId = req.user._id;

  const post = await validateAndCreatePost(postData, userId);

  return res
    .status(201)
    .json(new ApiResponse(201, "Post created successfully", post));
};

export const getPosts = async (req: Request, res: Response) => {
  const posts = await getAllPublishedPosts();

  return res
    .status(200)
    .json(new ApiResponse(200, "Posts fetched successfully", posts));
};

export const getPost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  await getPostById(postId);
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const postData = req.body;

  const post = await validateAndUpdatePost(postId, postData);

  return res
    .status(200)
    .json(new ApiResponse(200, "Post updated successfully", post));
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.id;

  await validateAndDeletePost(postId);

  return res.status(204).send();
};
