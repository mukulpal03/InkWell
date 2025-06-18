import Comment from "../models/comment";
import Post from "../models/post";
import ApiError from "../utils/apiError";
import { postStatusEnum } from "../utils/constants";

export const getAllComments = async (postId: string) => {
  try {
    const comments = await Comment.aggregate([
      {
        $match: {
          post: postId,
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "post",
          foreignField: "_id",
          as: "post",
        },
      },
      {
        $unwind: "$post",
      },
      {
        $match: {
          "post.status": postStatusEnum.APPROVED,
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
          content: 1,
          createdAt: 1,
          updatedAt: 1,
          user: {
            _id: 1,
            username: 1,
            email: 1,
          },
          post: {
            _id: 1,
            title: 1,
            slug: 1,
            status: 1,
            createdAt: 1,
            updatedAt: 1,
          },
        },
      },
    ]);

    return comments[0]
      ? comments
      : {
          comments: [],
        };
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndCreateComment = async (
  postId: string,
  userId: string,
  content: string
) => {
  try {
    const post = await Post.findById(postId);

    if (!post) throw new ApiError(404, "Post not found");

    const comment = await Comment.create({
      post: postId,
      user: userId,
      content,
    });

    return comment;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndUpdateComment = async (
  commentId: string,
  content: string
) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) throw new ApiError(404, "Comment not found");

    comment.content = content;
    await comment.save();

    return comment;
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndDeleteComment = async (commentId: string) => {
  try {
    const comment = await Comment.findByIdAndDelete(commentId);

    if (!comment) throw new ApiError(404, "Comment not found");
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};
