import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import ApiKey from "../models/apiKey";

export const validateKey = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) return next(new ApiError(401, "Api key is required"));

  try {
    const apiKeyExists = await ApiKey.findOne({
      key: apiKey,
      user: req.user._id,
    });

    if (!apiKeyExists) return next(new ApiError(401, "Invalid api key"));

    next();
  } catch (error: any) {
    console.error(error.message ?? "Internal server error");

    if (error instanceof ApiError) {
      return next(error);
    }

    return next(new ApiError(500, error.message ?? "Internal server error"));
  }
};
