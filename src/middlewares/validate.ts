import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";

export const validateData = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      next();
    } else {
      next(
        new ApiError(400, "Invalid data", result.error.flatten().fieldErrors)
      );
    }
  };
};
