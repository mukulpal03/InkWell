import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../controllers/post";
import { isLoggedIn } from "../middlewares/auth";
import { isPostOwner } from "../middlewares/ownerPermission";

const router = Router();

router.use(isLoggedIn);

router.route("/").get(asyncHandler(getPosts)).post(asyncHandler(createPost));

router
  .route("/:id")
  .get(asyncHandler(getPost))
  .put(isPostOwner, asyncHandler(updatePost))
  .delete(isPostOwner, asyncHandler(deletePost));

export default router;
