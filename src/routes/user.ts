import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  generateApiKey,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user";
import { isLoggedIn } from "../middlewares/auth";

const router = Router();

router.route("/register").post(asyncHandler(registerUser));

router.route("/login").post(asyncHandler(loginUser));

router.use(isLoggedIn);

router.route("/logout").get(asyncHandler(logoutUser));

router.route("/me").get(asyncHandler(getUser));

router.route("/api-key").post(asyncHandler(generateApiKey));

export default router;
