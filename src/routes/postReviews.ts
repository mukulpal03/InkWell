import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import {
  approvePost,
  getAllPendingPosts,
  rejectPost,
} from "../controllers/postReviews";
import { asyncHandler } from "../utils/asyncHandler";
import { authorizeAdmin } from "../middlewares/admin";

const router = Router();

router.use(isLoggedIn);

router.use(authorizeAdmin);

router.route("/").get(asyncHandler(getAllPendingPosts));

router.route("/:id/approve").post(asyncHandler(approvePost));

router.route("/:id/reject").post(asyncHandler(rejectPost));

export default router;
