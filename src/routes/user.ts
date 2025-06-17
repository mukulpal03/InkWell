import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { loginUser, registerUser } from "../controllers/user";

const router = Router();

router.route("/register").post(asyncHandler(registerUser));

router.route("/login").post(asyncHandler(loginUser));

export default router;
