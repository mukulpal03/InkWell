import Post from "../models/post";
import { IPost, postData } from "../types";
import voca from "voca";
import ApiError from "../utils/apiError";
import { postStatusEnum } from "../utils/constants";

export const validateAndCreatePost = async (
  postData: postData,
  userId: string
) => {
  const { title } = postData;

  const slug = voca.slugify(title);

  try {
    const existingPost = await Post.findOne({ slug, user: userId });

    if (existingPost) throw new ApiError(400, "Post already exists");

    const post = await Post.create({ ...postData, slug, user: userId });

    return post;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const getAllPublishedPosts = async () => {
  try {
    const posts: IPost[] = await Post.aggregate([
      {
        $match: {
          status: postStatusEnum.APPROVED,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $project: {
          _id: 1,
          title: 1,
          slug: 1,
          status: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            _id: 1,
            username: 1,
            email: 1,
          },
        },
      },
    ]);

    return posts[0]
      ? posts
      : {
          posts: [],
        };
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const getPostById = async (postId: string) => {
  try {
    const post = await Post.findOne({
      _id: postId,
      status: postStatusEnum.APPROVED,
    }).populate("user", "_id username email");

    if (!post) throw new ApiError(404, "Post not found");

    return post;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndUpdatePost = async (postId: string, data: any) => {
  try {
    const post: any = await Post.findOne({
      _id: postId,
    }).populate("user", "_id username email");

    if (data.title && data.title !== post.title)
      post.slug = voca.slugify(data.title);

    for (const key of Object.keys(data)) {
      post[key] = data[key];
    }

    await post.save();

    return post;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndDeletePost = async (postId: string) => {
  try {
    const post = await Post.findByIdAndDelete(postId);
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};
