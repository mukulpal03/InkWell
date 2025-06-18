import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { config } from "../config/env";

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token =
      req.cookies?.token ??
      req.headers["authorization"]?.replace("Bearer ", "");

    if (!token) return next(new ApiError(401, "Unauthorized req"));

    const decoded = jwt.verify(token, config.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error: any) {
    console.error(error?.message ?? "Internal server error");

    if (error instanceof JsonWebTokenError) {
      return next(new ApiError(400, "Invalid token"));
    }

    if (error instanceof TokenExpiredError) {
      return next(new ApiError(400, "Token is expired"));
    }

    if (error instanceof ApiError) {
      throw error;
    }

    return next(new ApiError(500, error?.message ?? "Internal server error"));
  }
};
