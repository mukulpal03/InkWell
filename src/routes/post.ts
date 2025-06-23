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
import { validateData } from "../middlewares/validate";
import { createPostSchema, updatePostSchema } from "../validators/post";

const router = Router();

router.use(isLoggedIn);

router
  .route("/")
  .get(asyncHandler(getPosts))
  .post(validateData(createPostSchema), asyncHandler(createPost));

router
  .route("/:id")
  .get(asyncHandler(getPost))
  .put(isPostOwner, validateData(updatePostSchema), asyncHandler(updatePost))
  .delete(isPostOwner, asyncHandler(deletePost));

export default router;
