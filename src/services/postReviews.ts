import Post from "../models/post";
import PostReview from "../models/postReviews";
import { IPost } from "../types";
import ApiError from "../utils/apiError";
import { postStatusEnum } from "../utils/constants";

export const getPendingPosts = async () => {
  try {
    const posts: IPost[] = await Post.aggregate([
      {
        $match: {
          status: postStatusEnum.PENDING,
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
    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndApprovePost = async (
  postId: string,
  comment: string | undefined
) => {
  try {
    const post = await Post.findOne({
      _id: postId,
    });

    if (!post) throw new ApiError(404, "Post not found");

    if (post.status === postStatusEnum.APPROVED)
      throw new ApiError(400, "Post already approved");

    post.status = postStatusEnum.APPROVED;
    await post.save();

    const postReview = new PostReview({
      post: postId,
      isApproved: true,
    });

    if (comment) postReview.comment = comment;

    await postReview.save();

    return post.populate("user", "_id username email").then((post) => {
      return post;
    });
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};

export const validateAndRejectPost = async (
  postId: string,
  comment: string | undefined
) => {
  try {
    const post = await Post.findById(postId);

    if (!post) throw new ApiError(404, "Post not found");

    if (post.status === postStatusEnum.REJECTED)
      throw new ApiError(400, "Post already rejected");

    post.status = postStatusEnum.REJECTED;
    await post.save();

    const postReview = new PostReview({
      post: postId,
      isApproved: false,
    });

    if (comment) postReview.comment = comment;

    await postReview.save();

    return post.populate("user", "_id username email").then((post) => {
      return post;
    });
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(500, error.message ?? "Internal server error");
  }
};
