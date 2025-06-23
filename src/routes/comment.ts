import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
  createPostComment,
  deletePostComment,
  getPostComments,
  updatePostComment,
} from "../controllers/comment";
import { asyncHandler } from "../utils/asyncHandler";
import { isCommentOwner } from "../middlewares/ownerPermission";
import { validateKey } from "../middlewares/apiKey";

const router = Router({ mergeParams: true });

router.use(isLoggedIn);
router.use(validateKey);

router
  .route("/")
  .get(asyncHandler(getPostComments))
  .post(asyncHandler(createPostComment));

router
  .route("/:id")
  .put(isCommentOwner, asyncHandler(updatePostComment))
  .delete(isCommentOwner, asyncHandler(deletePostComment));

export default router;
