import { NextFunction, Request, Response, RequestHandler } from "express";
import { AsyncRequestHandler } from "../types";

export const asyncHandler = (handler: AsyncRequestHandler): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(handler(req, res, next)).catch((err) => next(err));
  };
};
