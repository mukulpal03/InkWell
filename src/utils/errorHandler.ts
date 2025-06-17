import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ApiError from "./apiError";

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: err.success ?? false,
      message: err.message || "Something went wrong",
      errors: err.errors || [],
    });
    return;
  }

  res.status(500).json({
    success: false,
    message: err.message ?? "Internal server error",
    errors: [],
  });
};
