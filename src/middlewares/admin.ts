import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/apiError";
import { userRoleEnum } from "../utils/constants";

export const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== userRoleEnum.ADMIN)
    return next(new ApiError(403, "Access denied"));

  next();
};
