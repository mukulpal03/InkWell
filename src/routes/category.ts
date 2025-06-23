import { Router } from "express";
import { isLoggedIn } from "../middlewares/auth";
import { authorizeAdmin } from "../middlewares/admin";
import { asyncHandler } from "../utils/asyncHandler";
import { addCategory, getCategories } from "../controllers/category";

const router = Router();

router.use(isLoggedIn);

router
  .route("/")
  .get(asyncHandler(getCategories))
  .post(authorizeAdmin, asyncHandler(addCategory));

export default router;
