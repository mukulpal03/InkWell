import { Request, Response } from "express";
import {
  findUserById,
  generateApiKeyForUser,
  validateAndCreateUser,
  validateCredentialsAndGenerateToken,
} from "../services/user";
import ApiResponse from "../utils/apiResponse";
import { cookieOptions } from "../utils/constants";

export const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const { user, token } = await validateAndCreateUser(userData);

  return res
    .status(201)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(201, "User registered successfully", {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      })
    );
};

export const loginUser = async (req: Request, res: Response) => {
  const userData = req.body;

  const { token, user } = await validateCredentialsAndGenerateToken(userData);

  return res
    .status(200)
    .cookie("token", token, cookieOptions)
    .json(
      new ApiResponse(200, "User logged in successfully", {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      })
    );
};

export const logoutUser = async (req: Request, res: Response) => {
  return res
    .status(200)
    .clearCookie("token", cookieOptions)
    .json(new ApiResponse(200, "User logged out successfully", {}));
};

export const getUser = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const user = await findUserById(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, `Welcome ${user.username}`, user));
};

export const generateApiKey = async (req: Request, res: Response) => {
  const userId = req.user._id;

  const apiKey = await generateApiKeyForUser(userId);

  return res.status(200).json(
    new ApiResponse(201, "Api key generated successfully", {
      key: apiKey.key,
      username: req.user.username,
      email: req.user.email,
    })
  );
};
